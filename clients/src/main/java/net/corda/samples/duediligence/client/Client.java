package net.corda.samples.duediligence.client;

import com.google.common.base.Charsets;
import net.corda.client.rpc.CordaRPCClient;
import net.corda.client.rpc.CordaRPCConnection;
import net.corda.core.contracts.UniqueIdentifier;
import net.corda.core.crypto.SecureHash;
import net.corda.core.messaging.CordaRPCOps;
import net.corda.core.messaging.FlowHandle;
import net.corda.core.transactions.SignedTransaction;
import net.corda.core.utilities.NetworkHostAndPort;
import net.corda.samples.duediligence.flows.ValidateCorporateRecords;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import net.corda.samples.duediligence.Constants;

import java.io.*;
import java.nio.file.FileAlreadyExistsException;
import java.util.List;
import java.util.jar.JarInputStream;
import java.util.stream.Collectors;

public class Client {

    private static class Companion {
        static Logger logger = LoggerFactory.getLogger(Client.class);
    }

    public static void test()
    {

    }
    /**
     * Uploads the jar of blacklisted counterparties with whom agreements cannot be struck to the node.
     */
    public static void main(String[] args) throws IOException {

        //Test Flow
        /*
        NetworkHostAndPort rpcAddressLN = new NetworkHostAndPort("localhost", 10012);
        CordaRPCClient rpcClientLN = new CordaRPCClient(rpcAddressLN);
        CordaRPCConnection rpcConnectionLN = rpcClientLN.start("user1", "test");
        CordaRPCOps proxyLN = rpcConnectionLN.getProxy();
        UniqueIdentifier linearId = UniqueIdentifier.Companion.fromString("45f7629c-8a45-4431-8590-9cfb19a29fe6");

        FlowHandle<SignedTransaction> result = proxyLN.startFlowDynamic(ValidateCorporateRecords.ValidateCorporateRecordsInitiator.class, linearId);
        */

        if (args.length == 0) {
            String message = "Usage: uploadBlacklist <node address 1> <node address 2> ...";
            return;
            //throw new IllegalArgumentException(message.toString());
        }

        for (String arg : args) {
            NetworkHostAndPort nodeAddress = NetworkHostAndPort.parse(arg);
            CordaRPCConnection rpcConnection = new CordaRPCClient(nodeAddress).start("user1", "test");
            CordaRPCOps proxy = rpcConnection.getProxy();

            SecureHash attachmentHash = Constants.CORPORATE_JAR_HASH;

            // take relative path using substring of constant BLACKLIST_JAR_PATH, check if node contains blacklist already
            if (!proxy.attachmentExists(attachmentHash)) {
                System.out.println("Working Directory = " +
                        System.getProperty("user.dir"));
                attachmentHash = uploadAttachment(proxy, Constants.CORPORATE_JAR_PATH);
                Companion.logger.info("Corporate Auditor List uploaded to node at " + nodeAddress);
            } else {
                Companion.logger.info("Node already contains Corporate Auditor List, skipping upload at " + nodeAddress);
            }

            JarInputStream attachmentJar = downloadAttachment(proxy, attachmentHash);
            Companion.logger.info("Corporate Auditor List downloaded from node at " + nodeAddress);

            checkAttachment(attachmentJar, Constants.CORPORATE_ATTACTMENT_FILE_NAME, Constants.CORPORATE_ATTACHMENT_EXPECTED_CONTENTS);
            Companion.logger.info("Attachment contents checked on node at " + nodeAddress);
        }

    }

    /**
     * Uploads the attachment at [attachmentPath] to the node.
     */
    private static SecureHash uploadAttachment(CordaRPCOps proxy, String attachmentPath) throws FileNotFoundException, FileAlreadyExistsException {
        FileInputStream attachmentUploadInputStream = new FileInputStream(new File(attachmentPath));
        return proxy.uploadAttachment(attachmentUploadInputStream);
    }

    /**
     * Downloads the attachment with hash [attachmentHash] from the node.
     */
    private static JarInputStream downloadAttachment(CordaRPCOps proxy, SecureHash attachmentHash) throws IOException {
        InputStream attachmentDownloadInputStream = proxy.openAttachment(attachmentHash);
        return new JarInputStream(attachmentDownloadInputStream);
    }

    /**
     * Checks the [expectedFileName] and [expectedContents] of the downloaded [attachmentJar].
     */
    private static void checkAttachment(JarInputStream attachmentJar, String expectedFileName, List<String> expectedContents) throws IOException {
        String name = attachmentJar.getNextEntry().getName();
        while (!name.equals(expectedFileName)) {
            name = attachmentJar.getNextEntry().getName();
        }

        BufferedInputStream bisAttachmentJar = new BufferedInputStream(attachmentJar, (8 * 1024));
        InputStreamReader isrAttachmentJar = new InputStreamReader(bisAttachmentJar, Charsets.UTF_8);
        BufferedReader brAttachmentJar = new BufferedReader(isrAttachmentJar);

        List<String> contents = brAttachmentJar.lines().collect(Collectors.toList());

        if (!contents.equals(expectedContents)) {
            throw new IllegalArgumentException("Downloaded JAR did not have the expected contents.");
        }

    }
}