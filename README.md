# trust-coin
Cryptocurrency without a ledger

Trust coin is a protocol for interpretting cryptographically signed messages.  These message are used to issue or exchange virtual tokens by holders of public/private cryptographic key pairs.

As for sharing and publishing these messages, there are no specific rules for how to do this.  A suggested convention is to wait 24 hours after first publishing a transaction before accepting that transaction.  This gives the transaction time to propagate through networks interested in tracking the currency.  See the section on double signed transactions for more details.

Additional recommended conventions for publishing and propagating transaction messages are described in the section, "Publishing and Propagating Transaction Messages".

##Creating a currency and Issuing tokens

Anyone with a public/private cryptographic key pair can become an issuer of currency.

To create a new currency and issue tokens you sign a new message for each new token you create indicating the following:

  * Currency Issuer public key: The public key of the party issuing the currency.
  * Currency Name: The name of the currency that the token is an instance of.  The name and public key together indicate a unique currency.  It is recommended that you choose a unique name to avoid confusion with other currencies that other parties have issued.
  * Token ID: Each token of currency must have a unique identifier or serial number.  Using serial numbers that increment by one is a good idea.  This makes it easier for peers to track all instances of a currency.
  * Creation Time: For recording keeping purposes, indicate the time the token was issued with desired level of accuracy (month, day, minute, etc.) Remember that time ordering cannot be proven cryptographically. Timestamping messages is used to simplify record keeping and allow message recipients to evaluate whether they received that message in a timely manner.

Issued tokens belong the issuer until the send that token to another party with a transaction.


##Double signed transactions

Transactions should be signed by both participating parties.  The content of the signed transactions should be identitical.

Transactions should include the following information.
  * Currency Name
  * Currency Token ID
  * Currency Issuer Public Key
  * Sender Public Key
  * Recipient Public Key
  * Initial signature transaction time (to desired level of accuracy)
  * Expected Recipient Signature Delay (to desired level of accuracy)

Both recipient and sender must sign a transaction for it to be valid.  Normally the sender will sign first and give the message to the recipient.  The recipient will publish the sender's signed message and wait some desired amount of time.  This delay is to discourage the possibility of double spends.  Once the recipient signs the identitical transaction the transaction is valid.

If double spends occur there is no standard way for resolving the outcome of the double spend.  Coins that are double spent may be "lost" as parties may choose to reject coins with a double spend in their history.

This can make spent coins vulnerable to attacks where a previous coin owner can sabatoge the value of the coin by creating a double spend after the fact.  When choosing to accept or reject double spended coins you should keep such possibilities in mind.  In general, staying up to date with all legitimate published transactions involving a currency you accept is important so that you can fairly and accurately assess the legitimacy of specific transaction messages.

## Rejecting transactions

In case a transaction fails or is canceled before both parties sign the transaction, the recipient may publish a cancellation message to indicate the transaction will not occur and allow the sender spend that token somewhere else.

Senders should normally allow the recipient to publish the transaction message that they send them.  If a recipient does not want to accept the token they should not publish the received transaction message.  Nevertheless it is good practice to issue a transaction rejection message which the sender can publish so they are free to use the token again immediately, without fear of conflicting transaction messages being published.

## Conflicting transaction messages

If a party issues conflicting transaction messages, such as accepting or rejecting a unit of currency, or double spending a unit of currency, that hurts the reputation of the entity that signed those conflicting transactions.  There is no standard way to respond to such conflicting messages, but currency users would be wise to avoid transacting with parties with a history of conflicting transactions.

If a party tracks what messages they have signed(ie using a client) and keeps their private key secure, there is no reason they would legitimately sign conflicting transaction messages.  If transacting parties publish transaction messages promptly and wait according to described conventions, and peers track all transaction messages for currencies they accept, there should be no motivation for a party to publish illegitimate conflicting transaction messages.

## Stopping new Issues

If a currency issuer wants to permanently stop issuing tokens of a currency they may publish a message indicating the following:

 * Name of currency to stop issuing
 * Time to stop issuing (recommended no more than 24 hours previous of current time, though retroactively canceling can be accepted.  It is not recommended to use this feature to announce a future cancelation of a currency.)
 * Serial number of the last valid issued token. This is why
 * (optional) Hacked: a flag indicating whether the private key of the currency issuer has been compromised.  If a currency private key is stolen, a currency issuer can retrieve a backup of their private key and use this to publish a stop message.  Because competing messages will be published using the same private key, the issuing history and spending of currency tokens should be used to help determine which 

A currency issuer may wish to stop issuing the currency for a variety of reasons.

Proof of work: in case the private key is compromised, the real issuer and competing party can publish many messages indicating the same.

Preventing new issues of a currency can protect that currency from loss of value or possibility of hacking in the future.


## Parsing and interpretting signed messages

There is no strict a priori standard for the format of the signed messages specified in this document.  The information should be encoded in a clear and unambiguous way that is easy to parse.  Messages should avoid extra information not relevant to the transactions specified in this document.

The one important security implication to remember when omitting a public ledger is that there is no way to cryptographically prove the time a message was signed.  Only the ordering of messages signed by a specific key can be established, and only if the signer using that key is trusted.


## Denominations

There is no such thing as different denominations of a currency.  All tokens of a currency have the same value, and all transactions involve the transfer of individual tokens.  You may issue separate currencies and offer to exchange between them at a fixed rate.  In this way you may create different denominations.

You may also sign and accept the transfer of many different tokens and even seperate currencies in a single transaction message.

## Reducing excessive transactions, creating a reliable network of trust, permitting anonymity and preserving privacy.

The transaction delay and other aspects of the design of trust-coin encourage using trust-coin for larger transactions, reducing the number of transactions that need to be tracked.  The design of trust-coin encourages using consistent cryptographic key pairs for related transactions performed the same party.  In this sense sellers and consumers develop individual reputations based on their transaction history, even if there is no specific reputation algorithm.  The value of the currencies themselves is also based on the reputation of currency issuers.

There is no barrier to creating new identities.  Anonymity can helped be preserved if desired by creating a new identity for every transaction.

If further anonymity and smaller, faster, and lighter transactions are desired, it is recommended that people use [hash-cash](http://github.com/derekmc/hash-cash).

## Cryptography

The only cryptographic algorithm used by this scheme is public key cryptography.  Public key cryptography allows you to sign a message using a private key.  Every private key has a unique corresponding public key.  The public key can be used to verify the private key signature.  You publish the public key with each message so everyone can verify that that message was signed with a specific private key, even though the private key itself is not shared.

The security of public key cryptography algorithms is well understood by the cryptography community.  Public key cryptography is used in a variety of applications, including existing cryptocurrencies and protocols such as SSL.
The security of public key cryptography is well established and understood, and public key algorithms are being continually and gradually updated and improved to ensure continued security.

## Publishing and Propagating Transaction Messages

There is no prescribed way to publish or propagate transaction messages.  Nevertheless some peer to peer schemes may offer certain advantages.

###Peer to Peer publishing
Peer to peer publishing can offer many advantages.  It can help make the origin of messages harder to trace.  You can share a message without revealing you are the original entity publishing that message.

Diseases are studied in epidemiology.  The rate at which diseases spread is described by a figure *R<sub>0</sub>*.  This is called the [basic reproduction rate](https://en.wikipedia.org/w/index.php?title=Basic_reproduction_number&oldid=653148252).

By propagating messages through the network at a low basic reproduction rate through encrypted channels, this serves to obfuscate the origin of the message.  Algorithms that are aware of network topology(bittorrent DHT does this, I think) can be used to help ensure the message don't first saturate a local part of the network.

All peers can help in propagating messages, while only interested peers will process those messages and store them long term.

Depending on the *R<sub>0</sub>* value that peers use, messages will propagate through the network at different speeds. For example, an *R<sub>0</sub>* value of 1.2 would mean that peers would send the message on to at least one other party, and send the message twice with probability 0.2.

When a peer receives a message a second time, they should randomly decide whether to propagate again(perhaps with probablity *R<sub>0</sub>* - 1.  Topologically aware algorithms should help ensure that messages propagate effectively.

The lower the basic reproduction rate, the longer the chain will be obfuscating the origin of the message.  If peers are reliable in resending messages(they indicate they have received the message and commit to pass on), this will help ensure the message propagates through the network.

The more recent a message was published, the quicker peers should respond to passing it on.  A priority queue that considers both when the message was first published and how long it has been in queue can help messages propagate through the network quickly.

Public key holders should rotate which peers they use to publish a new message so that their peers can't associate their IP with their public key.

