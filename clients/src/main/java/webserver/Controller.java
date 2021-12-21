package webserver;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import net.corda.core.contracts.UniqueIdentifier;
import net.corda.core.crypto.SecureHash;
import net.corda.samples.duediligence.Constants;
import net.corda.samples.duediligence.flows.ShareAuditingResult;
import net.corda.samples.duediligence.flows.ValidateCorporateRecords;
import net.corda.core.contracts.ContractState;
import net.corda.core.identity.CordaX500Name;
import net.corda.core.identity.Party;
import net.corda.core.transactions.SignedTransaction;
import net.corda.samples.duediligence.flows.RequestToValidateCorporateRecords;
import net.corda.core.contracts.StateAndRef;
import net.corda.core.messaging.CordaRPCOps;
import net.corda.core.node.services.Vault;
import net.corda.core.node.services.vault.QueryCriteria;
import net.corda.samples.duediligence.states.CopyOfCoporateRecordsAuditRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import net.corda.samples.duediligence.states.CorporateRecordsAuditRequest;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.TEXT_PLAIN_VALUE;

@RestController
@RequestMapping("/")
@CrossOrigin
public class Controller {
    private final CordaRPCOps proxy;
    private final CordaRPCOps proxyLN;
    private final CordaRPCOps proxyFR;
    private final static Logger logger = LoggerFactory.getLogger(Controller.class);

    public Controller(NodeRPCConnection rpc) {
        this.proxy = rpc.proxy;
        this.proxyLN = rpc.proxyLN;
        this.proxyFR = rpc.proxyFR;
    }


    @GetMapping(
            value = {"/status"},
            produces = {"text/plain"}
    )
    private String status() {
        return "200";
    }

    @GetMapping(
            value = {"/servertime"},
            produces = {"text/plain"}
    )
    private String serverTime() {
        return LocalDateTime.ofInstant(this.proxy.currentNodeTime(), ZoneId.of("UTC")).toString();
    }

    @PostMapping (value = "StartKyc", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> StartKYCProcess(@RequestBody KycRequest request) throws IllegalArgumentException {

        int nbrOfFiles = 1;
        String party = request.partyName;
        String name = request.name;
        String address = request.address;
        String phoneNbr = request.phoneNbr;
        String income = request.income;
        String vehicleMake = request.vehicleMake;
        String vehicleModel = request.vehicleModel;
        String vehicleStyle = request.vehicleStyle;



        // Get party objects for myself and the counterparty.
        CordaX500Name partyX500Name = CordaX500Name.parse(party);
        Party otherParty = proxy.wellKnownPartyFromX500Name(partyX500Name);

        // Create a new IOU state using the parameters given.
        try {
            // Start the Validator Flow. We block and waits for the flow to return.
            String result = proxy.startTrackedFlowDynamic(RequestToValidateCorporateRecords.RequestToValidateCorporateRecordsInitiator.class, otherParty, nbrOfFiles, name, address,  phoneNbr, income, vehicleMake, vehicleModel, vehicleStyle).getReturnValue().get();
            // Return the response.
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Result : "+ result +" created.\n ");
            // For the purposes of this demo app, we do not differentiate by exception type.
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }


    @PostMapping (value = "ApprovalByLexisNexis" , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> SignByLexisNexis(@RequestBody ApproveKycRequest request) throws IllegalArgumentException {

        UniqueIdentifier linearId = UniqueIdentifier.Companion.fromString(request.linearId);

        try {
            // Start the Validator Flow. We block and waits for the flow to return.
            SignedTransaction result = proxyLN.startTrackedFlowDynamic(ValidateCorporateRecords.ValidateCorporateRecordsInitiator.class, linearId).getReturnValue().get();
            // Return the response.
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Result Transaction created.\n ");
            // For the purposes of this demo app, we do not differentiate by exception type.
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping (value = "ShareWithFerrari" , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> ShareWithFerrari(@RequestBody ShareKycRequest request) throws IllegalArgumentException {

        UniqueIdentifier linearId = UniqueIdentifier.Companion.fromString(request.linearId);
        SecureHash secureHash = Constants.CORPORATE_JAR_HASH;
        String party = request.partyName;

        CordaX500Name partyX500Name = CordaX500Name.parse(party);
        Party otherParty = proxy.wellKnownPartyFromX500Name(partyX500Name);

        try {
            // Start the Validator Flow. We block and waits for the flow to return.
            String result = proxy.startTrackedFlowDynamic(ShareAuditingResult.ShareAuditingResultInitiator.class, linearId, otherParty, secureHash).getReturnValue().get();
            // Return the response.
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Result Transaction created.\n ");
            // For the purposes of this demo app, we do not differentiate by exception type.
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping(value = "/flows", produces = TEXT_PLAIN_VALUE)
    private String flows() {
        return proxy.registeredFlows().toString();
    }

    @GetMapping(value = "/states", produces = TEXT_PLAIN_VALUE)
    private String states() {
        return proxy.vaultQuery(ContractState.class).getStates().toString();
    }


    @GetMapping(value = "/allblocks",produces = APPLICATION_JSON_VALUE)
    public List<StateAndRef<CorporateRecordsAuditRequest>> getAllBlocks() {
        // Filter by state type: IOU.
        return proxy.vaultQuery(CorporateRecordsAuditRequest.class).getStates();
    }

    @GetMapping(value = "/porscheblocks",produces = APPLICATION_JSON_VALUE)
    public  List<PorscheSummary> getPorscheBlocks() {
        List<StateAndRef<CorporateRecordsAuditRequest>> myious = proxy.vaultQuery(CorporateRecordsAuditRequest.class).getStates().stream().filter(
                it -> it.getState().getData().getApplicant().equals(proxy.nodeInfo().getLegalIdentities().get(0))).collect(Collectors.toList());

        List<PorscheSummary> summary = new ArrayList<>();
        for (StateAndRef<CorporateRecordsAuditRequest> stateAndRef : myious) {
            summary.add(
                    new PorscheSummary(stateAndRef.getState().getData().getLinearId().toString(),
                            stateAndRef.getState().getData().getName(),
                            stateAndRef.getState().getData().getAddress(),
                            stateAndRef.getState().getData().getVehicleMake(),
                            stateAndRef.getState().getData().getQualification().toString())
            );


        }
        return summary;
    }

    @GetMapping(value = "/lexisnexisblocks",produces = APPLICATION_JSON_VALUE)
    public  List<PorscheSummary> getLexisNexisBlocks() {
        List<StateAndRef<CorporateRecordsAuditRequest>> myious = proxyLN.vaultQuery(CorporateRecordsAuditRequest.class).getStates().stream().filter(
                it -> it.getState().getData().getValidater().equals(proxyLN.nodeInfo().getLegalIdentities().get(0))).collect(Collectors.toList());

        List<PorscheSummary> summary = new ArrayList<>();
        for (StateAndRef<CorporateRecordsAuditRequest> stateAndRef : myious) {
            summary.add(
                    new PorscheSummary(stateAndRef.getState().getData().getLinearId().toString(),
                            stateAndRef.getState().getData().getName(),
                            stateAndRef.getState().getData().getAddress(),
                            stateAndRef.getState().getData().getVehicleMake(),
                            stateAndRef.getState().getData().getQualification().toString())
            );


        }
        return summary;
    }

    @GetMapping(value = "/ferrariblocks",produces = APPLICATION_JSON_VALUE)
    public List<FerrariSummary> getFerrariBlocks() {

        List<StateAndRef<CopyOfCoporateRecordsAuditRequest>> list = proxyFR.vaultQuery(CopyOfCoporateRecordsAuditRequest.class).getStates();
        List<FerrariSummary> summary = new ArrayList<>();
        for(StateAndRef<CopyOfCoporateRecordsAuditRequest> stateAndRef : list) {
            summary.add(
                    new FerrariSummary(stateAndRef.getState().getData().getOriginalRequestId().toString(),
                            stateAndRef.getState().getData().getOriginalReportTxId().toString())
            );

        }

        return  summary;
    }

    @GetMapping(value = "/porschenode",produces = APPLICATION_JSON_VALUE)
    public String  porscheNode() {
        return proxy.nodeInfo().getLegalIdentities().get(0).getName().toString();
    }

    @GetMapping(value = "/lnnode",produces = APPLICATION_JSON_VALUE)
    public String  lnnode() {
        return proxyLN.nodeInfo().getLegalIdentities().get(0).getName().toString();
    }


    @GetMapping(value = "/ferrarinode",produces = APPLICATION_JSON_VALUE)
    public String  ferrarinode() {
        return proxyFR.nodeInfo().getLegalIdentities().get(0).getName().toString();
    }


}

class FerrariSummary {
    public String Transactionid;
    public String LinearId;

    public FerrariSummary(String _LinearId, String _Transactionid)
    {
        Transactionid = _Transactionid;
        LinearId = _LinearId;
    }
}


class PorscheSummary {
    public String LinearId;
    public String Name;
    public String Address;
    public String VehicleMake;
    public String Qualified;

    public PorscheSummary(String _LinearId,
                          String _Name, String _Address, String _vehicleMake, String _qualified)
    {
        Name = _Name;
        LinearId = _LinearId;
        Address = _Address;
        VehicleMake = _vehicleMake;
        Qualified = _qualified;
    }
}

class KycRequest
{
    String nbrOfFiles;
    String partyName;
    String name;
    String address;
    String phoneNbr;
    String income;
    String vehicleMake;
    String vehicleModel;
    String vehicleStyle;

    public String getPartyName() {
        return partyName;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }
    public String getPhoneNbr() {
        return phoneNbr;
    }

    public String getIncome() {
        return income;
    }

    public String getVehicleMake() {
        return vehicleMake;
    }

    public String getVehicleModel() {
        return vehicleModel;
    }

    public String getVehicleStyle() {
        return vehicleStyle;
    }


}

class ApproveKycRequest
{
    String linearId;

    public String getLinearId() {
        return linearId;
    }
}

class ShareKycRequest
{
    String linearId;
    String partyName;

    public String getLinearId() {
        return linearId;
    }

    public String getPartyName() {
        return partyName;
    }
}