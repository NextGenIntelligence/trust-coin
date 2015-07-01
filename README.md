# trust-coin
Cryptocurrency without a ledger

Trust coin is a protocol for interpretting cryptographically signed messages which allow these messages to function as a currency.

As for sharing and publishing these messages, there are no specific rules for how to do this.  The one suggested convention is to wait 24 hours after first publishing a transaction before accepting a transaction.  This gives the transaction time to propagate through the network.  See the section on double signed transactions for more details.


##Creating a currency and Issuing tokens

Anyone with a public/private cryptographic key pair can become an issuer of currency.

To create a new currency and issue tokens you sign messages indicating the following:

  * Currency Name: The name of the currency that the token is an instance of.  The name and public key together indicate a unique currency.  It is recommended that you choose a unique name to avoid confusion with other currencies that other parties have issued.
  * Token ID: Each token of currency must have a unique identifier or serial number.
  * Creation Time: For recording keeping purposes, indicate the time the token was issued with desired level of accuracy (month, day, minute, etc.) Remember that time ordering cannot be proven cryptographically. Timestamping messages is used to simplify record keeping and allow message recipients to evaluate whether they received that message in a timely manner.




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

This can make spent coins vulnerable to attacks where a previous coin owner can sabatoge the value of the coin by creating a double spend after the fact.  When choosing to accept or reject double spended coins you should keep such possibilities in mind.  In general, staying up to date with all legitimate published transactions involving a currency you accept be important so that you can fairly and accurately assess the legitimacy of specific transaction messages.


## Parsing and interpretting signed messages

There is no strict a priori standard for the format of the signed messages specified in this document.  The information should be encoded in a clear and unambiguous way that is easy to parse.  Messages should avoid extra information not relevant to the transactions specified in this document.

The one important security implication to remember when omitting a public ledger is that there is no way to cryptographically prove the time a message was signed.  Only the ordering of messages signed by a specific key can be established, and only if the signer using that key is trusted.
