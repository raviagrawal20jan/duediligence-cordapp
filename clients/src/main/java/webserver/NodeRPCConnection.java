package webserver;

import net.corda.client.rpc.CordaRPCClient;
import net.corda.client.rpc.CordaRPCConnection;
import net.corda.core.messaging.CordaRPCOps;
import net.corda.core.utilities.NetworkHostAndPort;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

/**
 * Wraps an RPC connection to a Corda node.
 *
 * The RPC connection is configured using command line arguments.
 */
@Component
public class NodeRPCConnection implements AutoCloseable {

    /*  // The host of the node we are connecting to.
    @Value("${config.rpc.host}")
    private String host;
    // The RPC port of the node we are connecting to.
    @Value("${config.rpc.username}")
    private String username;
    // The username for logging into the RPC client.
    @Value("${config.rpc.password}")
    private String password;
    // The password for logging into the RPC client.
    @Value("${config.rpc.port}")
    private int rpcPort;
*/
    private CordaRPCConnection rpcConnection;
    private CordaRPCConnection rpcConnectionLN;
    private CordaRPCConnection rpcConnectionFR;
    CordaRPCOps proxy;
    CordaRPCOps proxyLN;
    CordaRPCOps proxyFR;

    @PostConstruct
    public void initialiseNodeRPCConnection() {
        NetworkHostAndPort rpcAddress = new NetworkHostAndPort("localhost", 10006);
        CordaRPCClient rpcClient = new CordaRPCClient(rpcAddress);
        rpcConnection = rpcClient.start("user1", "test");
        proxy = rpcConnection.getProxy();

        NetworkHostAndPort rpcAddressLN = new NetworkHostAndPort("localhost", 10012);
        CordaRPCClient rpcClientLN = new CordaRPCClient(rpcAddressLN);
        rpcConnectionLN = rpcClientLN.start("user1", "test");
        proxyLN = rpcConnectionLN.getProxy();

        NetworkHostAndPort rpcAddressFR = new NetworkHostAndPort("localhost", 10009);
        CordaRPCClient rpcClientFR = new CordaRPCClient(rpcAddressFR);
        rpcConnectionFR = rpcClientFR.start("user1", "test");
        proxyFR = rpcConnectionFR.getProxy();
    }

    @PreDestroy
    public void close() {
        rpcConnection.notifyServerAndClose();
        rpcConnectionLN.notifyServerAndClose();
        rpcConnectionFR.notifyServerAndClose();
    }
}