
var http = require('http'),
    url = require('url'),
    static = require('node-static');

var file = new static.Server("./www");

// Note: I believe messages signed with a public key use random padding for security purposes.  I need to research this and consider implications.
// example transaction

{
    data : JSON.stringify({
        action: "exchange",
        issuer_pubkey:
        currency_name: ,
        currency_tokenid: ,
        currency_generation: ,
        sender_pubkey: ,
        recipient_pubkey: ,
        sendtime: ,
    }),
    sender_sig: "",
    recipient_sig: "",
}

// example issue
{
    data : JSON.stringify({
        action: "issue"
        issuer_pubkey: ,
        currency_name: ,
        currency_tokenid: ,
        currency_generation: ,
        issuetime: ,
    }),
    issuer_sig: "",
}

//example reject
{
    data : JSON.stringify({
        action: "reject",
        issuer_pubkey:
        currency_name: ,
        currency_tokenid: ,
        currency_generation: ,
        sender_pubkey: ,
        recipient_pubkey: ,
        sendtime: ,
        rejecttime: ,
    }),
    sender_sig: "",
    recipient_sig: "",
}

// example stop new issue
{
    data : JSON.stringify({
        action: "stop issue",
        issuer_pubkey:
        currency_name: ,
        last_tokenid:,
        stoptime: ,
        proof_of_work: "" // a string that makes signature or a hash begin with leading zeros. Used to add weight to competing stop messages.
    }),
    sender_sig: "",
    recipient_sig: "",
}




// XOR binary union of all signatures is used to identify sets transaction messages.
//

// webcalls
//
// Each transaction message is identified by a signature id, or sigid.
// The sigid is an abbreviated version of the messages signature
/*

list: Returns a list of signature ids(abbreviated signatures) of all matching transactions.  All arguments are optional and restrict the selected set. Some arguments may require the presence of other arguments.  This call may return an xor union of a set of sigids that have been processed but are no longer stored in addition to listing all matching signature ids.  For consistency xor history truncation should be done on a per-token basis, ie, all messages before a certain point in a coins history are discarded and replaced with the xor union of all those message signatures.
    issuer_pubkey
    currency_name
    currency_tokenid
    currency_generation: the earliest 'generation' of a particular currency token to list. Each exchange increments the generation number.
    timestart
    timeend
    signer_pubkey: listing all message signed by a particular public key is important.

listxor: Returns xor union of all matching message sigids. This is to allow peers to identify a certain set of sigids without explicitly listing all sigids.
    issuer_pubkey
    currency_name
    currency_tokenid
    currency_generation
    timestart
    timeend
    signer_pubkey

get: Returns a transaction message given a signature id
    sigid

getall: Returns all the transaction messages from a list of signature ids
    sigids


pubmessage: Publish a message using this peer.  Server response indicates if message was recieved and will be shared.
    r0: the approximate number of peers with which to share this message.

peerinfo: Returns info about a peer, like which currencies they track and if desired other info.

/getrecent/issuer_pubkey/currency_name/


/getcurrency/xor


/gettoken/

*/


    

// 

function handler(req, res){
    var url = require('url');
    var urlobj = url.parse(req.url);
    var pathparts = urlobj.pathname.substr(1).split("/");
    var action = pathparts[0];
    console.log(action);
    if(action == "www"){
        file.serve(req, res); }
    else{
        // handle webcalls
    }
        
}

httpd = http.createServer(handler);

httpd.listen(process.env.PORT? process.env.PORT : 8080);
