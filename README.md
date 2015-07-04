# trust-coin
Cryptocurrency without a ledger.

*Consensus through independtly verified and recorded histories.*

trust-coin is a protocol for writing cryptographically signed messages that allows holders of public/private key pairs to issue, exchange, and accept virtual tokens as currencies.  It is unique because it is not a single currency but a tool for users to create their own currencies that can live on a distributed network without centralized exchange.

Rather than thinking of the entire network as having one ledger, each trust-coin coin has its own uniquely tracked history.  Each time a coin changes hands is a generation.  Conflicting transaction messages can lead the history of a particular coin to fork, but this fork only applies to that coin, and only jeopardizes the value of that coin.  All coin exchanges are signed twice, once by both sender and recipient, so both parties attest that the transaction is valid.  Specifically, recipients should wait a stipulated amount of time before publishing their signature acknowledging receipt of the coin.  This delay prevents the possibility of a double spend assuming that network participants receive all messages in a timely manner.  Both sender and recipient have an important responsibility in assuring that no double spends occur.

Transacting on a branch of a coin's history is a vote on the validity of that branch in the case of a fork.  The history and reputation of the public keys used is considered in weighting this vote.  This is discussed in detail in the section: "Resolving double spends and coin forks"

trust-coin itself has no strict rules for how the network works.  Peers can publish, share, accept, and store transaction messages anyway they like.  Additionally, users or client implementors can choose their own criteria for accepting coins.  The only strict rule is to not publish conflicting transaction messages signed with your key.

There are some suggested conventions to prevent fraud in the exchange of currency tokens.  One of these conventions is to wait 24 hours after publishing a transaction message before signing receipt of that transaction, especially when transacting with a new/anonymous party.  trust-coin allows peers to reuse the same keys to establish trust and reputation (although there is no specific reputation algorithm), or to create new keys each time if strict anonymity is desired.  To prevent fraud when transacting, the 24 hour waiting period is recommended so that conflicting transaction messages cannot be published simultaneously.  A 24 hour waiting period allows any client that downloads updates daily to positively assert which transaction message was published first.  The conflicting message can be ignored, though the reputation of the key that signed it will be damaged.

The section on double signed transactions has more information about how currency tokens change hands.

Some possible network designs and conventions for publishing and propagating transaction messages are described in the section, "publishing and propagating transaction messages".

trust-coin uniquely allows many currencies to coexist on the same network.  The burden each currency places on peers is flexible as peers decide what role they will play in transmitting and storing transaction messages.  It is recommended that peers contribute to propagating many different currency transaction messages but may store long term only those messages of currencies of interest.  Less popular currencies will not create a significant burden on the network.

##Creating a currency and issuing tokens

Anyone with a public/private cryptographic key pair can become an issuer of their own unique currency.

To create a new currency and issue tokens you sign a new message for each new token you create indicating the following:

  * Currency Issuer public key: The public key of the party issuing the currency.
  * Currency Name: The name of the currency that the token is an instance of.  The name and public key together indicate a unique currency.  It is recommended that you choose a unique name to avoid confusion with other currencies that other parties have issued.
  * Token ID: Each token of currency must have a unique identifier or serial number.  Using serial numbers that increment by one is a good idea.  This makes it easier for peers to track all instances of a currency.
  * Creation Time: For record keeping purposes, indicate the time the token was issued with desired level of accuracy (month, day, minute, etc.) Remember that time ordering cannot be proven cryptographically. Timestamping messages is used to simplify record keeping and allow message recipients to evaluate whether they received that message in a timely manner.

Issued tokens belong to the issuer until they send that token to another party with a double signed transaction message.


## Coin exchanges are signed by both parties

Coin exchanges should be signed by both participating parties: sender and recipient. 

Coin exchange messages should include the following information.
  * Message action (in this case, send or receive)
  * Parent sigid (signature id of the parent message preceeding this one in the coin's history, this creates a genealogy)
  * Currency Issuer Public Key
  * Currency Name
  * Currency Token ID
  * Currency Generation (how many times this token has changed hands)
  * Sender Public Key
  * Recipient Public Key
  * Initial signature transaction time (to desired level of accuracy)
  * Expected Recipient Signature Delay (to desired level of accuracy)


Both recipient and sender must sign a coin exchange for it to be valid.  Normally the sender will sign first and give the message to the recipient.  The recipient will publish the sender's signed message and wait some desired amount of time.  This delay is to discourage the possibility of double spends.  Once the recipient signs the identitical transaction the transaction is valid.

If double spends occur there is no standard way for resolving the outcome of the double spend.  Coins that are double spent may be "lost" as parties may choose to reject coins with a double spend in their history.

This can make spent coins vulnerable to attacks where a previous coin owner can sabatoge the value of the coin by creating a double spend after the fact.  When choosing to accept or reject double spended coins you should keep such possibilities in mind.  In general, staying up to date with all published transactions involving a currency you accept is important so that you can fairly and accurately assess the legitimacy of specific transaction messages.  This behavior will normally be handled by programmed clients, but there is necessarily no strict specification for how clients handle this.  A precise prescription for how clients handle this is not necessary and would make the system vulnerable to manipulation through specific attack vectors.  Client implementors and people using those clients are responsible to make sure that the client behaves in such a way to protect their interests.

This is discussed further in the section: "Conflicting transaction messages"

## Rejecting transactions

In case a transaction fails or is aborted before both parties sign the transaction, the recipient may publish a cancellation message to indicate the transaction will not occur and allow the sender spend that token somewhere else.

Senders should allow the recipient to publish the transaction message that they send them.  This way if a recipient chooses not to accept the token they should not publish the received transaction message.  Nevertheless it is good practice to issue a transaction rejection message which the sender can publish so they are free to use the token again immediately, without fear of a conflicting transaction message being published and putting a blemish on their record.

The content of the rejected transaction is the same as the content of the transaction itself except with a flag indicating that the transaction is being rejected.

## Conflicting transaction messages

If a party issues conflicting transaction messages, such as both accepting and rejecting a transaction, or double spending a unit of currency, that hurts the reputation of the entity that signed those conflicting transactions.  There is no standard way to respond to such conflicting messages, but currency users would be wise to avoid transacting with parties with a history of conflicting transactions.

If a party tracks what messages they have signed(ie using a client) and keeps their private key secure, there is no reason they would legitimately sign conflicting transaction messages.  If transacting parties publish transaction messages promptly and wait according to described conventions, and peers track all transaction messages for currencies they accept, there should be no motivation for a party to publish illegitimate conflicting transaction messages.

## Resolving double spends and coin forks

For anonymous single use keys, there may be no deterrent to double spending.  Thus it is important that the community protect against attempts to double spend coins.  It is important that the behavior of the people in the network resolve double spends in a timely manner.

One unique aspect of trust coin is its focus on relationships between different parties and the incentives and expectations involved in these relationships.

Money is first and foremost is an accounting tool.  trust-coin is intended to be used for larger transactions or exchanges of value that are of interest to the entire community.  The time delay and discrete coin values are two aspects of trust-coin's design that discourage overreliance on the network.  If a merchant and customer have an ongoing relationship, it is expected that they would keep a seperate accounting of balances in this relationship.  This allows arbitrary accuraccy and reduces the burden placed on the network from many interactions and balance updates.

Many merchants may decide not to transact with anonymous parties unless there is an ongoing relationship.  In case of a double spend that compromises the value of a coin received, they will be in a position to hold the other party accountable.

Identities are free, but the history associated with each identity is not free.  Identities can be reused without tying that identity to other identities including real world identity.  Reusing the same identity develops a history and reputation of being reliable and trustworthy in conducting transactions.  In this way a public key's history of signed transactions becomes like a form of consumer credit or reddit karma.  Merchants as well should use the same public key to establish

Because individual coins fork and not the entire community, an individual double spend might not be an existential threat to the community itself.  Nevertheless the community should take all instances of double spends seriously, and take effective measures as individuals to prevent or discourage this behavior in the future.

Any time a branch of a coin fork is accepted after a double spend, that is effectively a vote on that branch of the coin's forked history.  In determining the weight of this vote, entities should look at the history of that public key.

If you have been sabatoged by a double spend, and your own reputation is not sufficient to establish your priority claim in the outcome, you should look to spend or cycle your coin with trusted merchants or services who can affirm the temporal priority of your branch in the coin's fork.

All major merchants and players should continually track the state of the network independently.  They do this to protect their interest in being able to accurately assess temporal order of transaction messages and independently verify priority of conflicting messages.  All these entities should have sufficient motivation to fairly, objectively, and independently evaluate your claim.  They should be motivated to accept your coin if your claim is valid because that means more business for them.

When being asked to evaluate a coin fork, there are three possible choices an entity could make.  They could choose one fork or the other or choose not to accept a coin at all.  Having an identical process for choosing this outcome is not an advantage, but rather a weakness.  An identitical process for deciding coin forks makes it easier for attackers to evaluate what will lead one coin fork to succeed over another.  Instead, the consistency of different algorithms in choosing one fork over another is paramount.  This consistency comes from everyone participating in the network and independently recording all history for currencies of interest.  The temporal priority of messaegs should be known to everyone involved, and all "votes" both use and affect reputation.

Anonymity, privacy, and reputation are all different concepts.  trust-coin allows users and merchants to find a balance of these that works for them and protects their interests in using the network.



## Stopping new issues

If a currency issuer wants to permanently stop issuing tokens of a currency they may publish a message indicating the following:

 * Name of currency to stop issuing
 * Time to stop issuing (recommended no more than 24 hours previous of current time.  This should not be used to announce a future cancelation of a currency. In that case issue the tokens, cancel and hold.)
 * Serial number of the last valid issued token. This is one reason why it is a good idea to increment serial numbers by one with each new token issued.
 * (optional) Hacked: a flag indicating whether the private key of the currency issuer has been compromised.  If a currency private key is stolen, a currency issuer can retrieve a backup of their private key and use this to publish a stop message.  Because competing messages will be published using the same private key, the issuing history and spending of currency tokens should be used to help determine which stop message is the legitimate stop message created by the original holder of the public/private key pair.

A currency issuer may wish to stop issuing the currency for a variety of reasons.

Preventing new issues of a currency can protect that currency from loss of value or possibility of hacking in the future.

In the case of hacking, the following algorithm can be used to limit the ability of the hacker to manipulate which version of a "Stop New Issues" message should be accepted.

Proof of work: in case the private key is compromised, the real issuer and competing party can publish many messages indicating the same time to stop issuing and the same serial number of the last valid issued token.  This way, peers would only need to choose between two valid messages for the legitimate stop new issues message.  Existing proof of work algorithms can be used to give weight to these redundant messages.

Proof of work in this case cannot prove the legitimacy of the message published, it only limits the ability of a hacker to flood the network with conflicting stop issuing messages in hopes of increasing the chances of securing some of that issued currency for themselves, or invalidating legitimately issued tokens.


## Parsing and interpretting signed messages

There is no strict a priori standard for the format of the signed messages specified in this document.  The information should be encoded in a clear and unambiguous way that is easy to parse.  Messages should avoid extra information not relevant to the transaction or not specified in this document.

The one important security implication to remember when not using a public ledger is that there is no way to cryptographically prove the time a message was signed.  Only the ordering of messages signed by a specific key can be established, and only if the signer using that key is trusted.  For this reason propagating messages through the network, replicating the information contained in these messages, and waiting to accept transactions are very important.


## Denominations and Multicoin transactions

There is no such thing as different denominations of a trust-coin currency.  All tokens of a currency have the same value, and all transactions involve the transfer of individual tokens.  If you want to emulate this behavior you may issue separate currencies and commit to exchange between them at a fixed rate.  In this way you may create different denominations.

trust-coin permits sending and receiving the transfer of many different tokens and even seperate currencies in a single transaction message.  All coins must belong to the holder of the public key signing the transaction.  If any coins are invalid or rejected, the recipient must reject the entire transaction.  Signing an invalid transaction message puts a blemish on the signers history and can result in loss of all coins associated with the transaction.  Rejecting a transaction avoids this and allows the sender to use legitimately owned coins in a different transaction.

To send many coins of the same currency at once, the sender need only list all serial numbers consecutively.

If coins are published representing different denominations, it is recommended that issuers don't have many different denominations.  For example, the issuer may create tokens representing 1 unit, 1,000 units, and 1,000,000 units.  Because sending multiple coins of a single denomination only requires listing multiple serial numbers, it is easier to send hundreds of coins of the same type in a single message, than to try to worry about making change between many different denominations of coins.

Discrete token units mean that each coin can have a unique history but also limit exchanges to discrete amounts and require explicitly listing multiple token serial numbers.


## Reducing excessive transactions, creating a reliable network of trust, permitting anonymity and preserving privacy.

The transaction delay and other aspects of the design of trust-coin encourage using trust-coin for larger transactions, reducing the number of transactions that need to be tracked.  The design of trust-coin encourages using consistent cryptographic key pairs for related transactions performed the same party.  In this sense sellers and consumers develop individual reputations based on their transaction history, even if there is no specific reputation algorithm.  The value of the currencies themselves is also based on the reputation of the currency issuers.

There is no barrier to creating new identities.  Anonymity can helped be preserved if desired by creating a new identity for every transaction.

If further anonymity and smaller, faster, and lighter transactions are desired, it is recommended that people use [hash-cash](http://github.com/derekmc/hash-cash).

## Cryptography

The only cryptographic algorithm used by this scheme is public key cryptography.  Public key cryptography allows you to sign a message using a private key.  Every private key has a unique corresponding public key.  The public key can be used to verify the private key signature.  You publish the public key with each message so everyone can verify that that message was signed with a specific private key, even though the private key itself is not shared.

The security of public key cryptography algorithms is well understood by the cryptography community.  Public key cryptography is used in a variety of applications, including existing cryptocurrencies and protocols such as SSL.
The security of public key cryptography is well established and understood, and public key algorithms are being continually and gradually updated and improved to ensure continued security.

## Publishing and propagating transaction messages

There is no prescribed way to publish or propagate transaction messages.  Nevertheless some peer to peer schemes may offer certain advantages.

###Peer to peer publishing
Peer to peer publishing can offer many advantages.  It can help make the origin of messages harder to trace.  You can share a message without revealing you are the original entity publishing that message.

Diseases are studied in epidemiology.  The rate at which diseases spread is described by a figure *R<sub>0</sub>*.  This is called the [basic reproduction rate](https://en.wikipedia.org/w/index.php?title=Basic_reproduction_number&oldid=653148252).

By propagating messages through the network at a low basic reproduction rate through encrypted channels, this serves to obfuscate the origin of the message.  Algorithms that are aware of network topology(bittorrent DHT does this, I think) can be used to help ensure the message don't first saturate a local part of the network.

All peers can help in propagating messages, while only interested peers will process those messages and store them long term.

Depending on the *R<sub>0</sub>* value that peers use, messages will propagate through the network at different speeds. For example, an *R<sub>0</sub>* value of 1.2 would mean that peers would send the message on to at least one other party, and send the message twice with probability 0.2.

When a peer receives a message a second time, they should randomly decide whether to propagate again(perhaps with probablity *R<sub>0</sub>* - 1.  Topologically aware algorithms should help ensure that messages propagate effectively.  The original publisher of a message can always choose to publish again if it fails to propagate, or send multiple times initially if they are not worried about obfuscating origin.

The lower the basic reproduction rate, the longer the chain will be obfuscating the origin of the message.  If peers are reliable in resending messages(they indicate they have received the message and commit to pass on), this will help ensure the message propagates through the network.

The more recently a message was published, the quicker peers should respond to passing it on.  A priority queue that considers both when the message was first published and how long it has been in queue can help messages propagate through the network quickly.

Public key owners should rotate which peers they use to publish a new message so that their peers can't associate their IP with their public key.

