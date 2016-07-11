var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});


// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


bot.dialog('/help', [
    function (session) {
        builder.Prompts.choice(session, "Hello I am the Aptbot! What you like to do?", "Create Account|Create Oppotunity|Create Contact|Create Quote|Create Agreement|");
    },
    function (session, results) {
        if (results.response && results.response.entity != '(quit)') {
            // Launch demo dialog
            session.beginDialog('/' + results.response.entity);
        } else {
            // Exit the menu
            session.endDialog();
        }
    },
    function (session, results) {
        // The menu runs a loop until the user chooses to (quit).
        session.replaceDialog('/help');
    }
]);

//CREATE AGREEMENT

bot.dialog('/createAgreement', [
    function (session) {
        builder.Prompts.text(session, "Hello... my name is Aptbot. What's you name?");
    },
    function (session, results) {
        session.dialogData.agreementName = results.response;
        builder.Prompts.text(session, "Hi " + results.response + ", What is the agreement's Name?"); 
    },
    function (session, results) {
        session.dialogData.product = results.response;
        builder.Prompts.choice(session, "What type of Agreement?", ["NDA", "MSA", "SOW"]);
    },
    function (session, results) {
        session.dialogData.startDate = results.response;
        builder.Prompts.time(session, "What is the Start Date?");
    },
    function (session, results) {
        session.dialogData.endDate = results.response;
        builder.Prompts.time(session, "What is the End Date?");
    },
    function (session, results) {
        session.dialogData.nameAgain = results.response.entity;
        session.send("Got it... I have created your Agreement! ");
    }
]);

//CREATE ACCOUNT

bot.dialog('/createAccount', [
    function (session) {
        builder.Prompts.text(session, "Hello... my name is Aptbot. What's you name?");
    },
    function (session, results) {
        session.dialogData.accountName = results.response;
        builder.Prompts.text(session, "Hi " + results.response + ", What is the Account's Name?"); 
    },
    function (session, results) {
        session.dialogData.type = results.response;
        builder.Prompts.text(session, "What is the Relationship Type?");
    },
    function (session, results) {
        session.dialogData.revenue = results.response;
        builder.Prompts.number(session, "What is the Annual Revenue?");
    },
    function (session, results) {
        session.dialogData.employees = results.response;
        builder.Prompts.number(session, "How many employees?");
    },
    function (session, results) {
        session.dialogData.account = results.response.entity;
        session.send("Got it... I have created your Account! ");
      //  if (session.dialogData.accountName && session.dialogData.type && session.dialogData.revenue && session.dialogData.employees) {
        //    session.endDialogWithResult({
          //      response: { Account Name: session.dialogData.accountName, Type: session.dialogData.type, Revenue: session.dialogData.revenue, Employees: session.dialogData.employees }
            //});
    }
]);

//CREATE CONTACT

bot.dialog('/createContact', [
    function (session) {
        builder.Prompts.text(session, "Hello... my name is Aptbot. What's you name?");
    },
    function (session, results) {
        session.dialogData.firstName = results.response;
        builder.Prompts.text(session, "Hi " + results.response + ", What is the Contact's First Name?"); 
    },
    function (session, results) {
        session.dialogData.lastName = results.response;
        builder.Prompts.text(session, "What is the Contact's Last Name?");
    },
    function (session, results) {
        session.dialogData.phone = results.response;
        builder.Prompts.number(session, "What is the Phone Number?");
    },
    function (session, results) {
        session.dialogData.email = results.response;
        builder.Prompts.text(session, "What is the Email?");
    },
    function (session, results) {
        session.dialogData.type = results.response.entity;
        session.send("Got it... I have created your Contact! ");
    }
]);

//CREATE MSA

bot.dialog('/createMSA', [
    function (session) {
        builder.Prompts.text(session, "Hello... my name is Aptbot. What's you name?");
    },
    function (session, results) {
        session.dialogData.accountName = results.response;
        builder.Prompts.text(session, "Hi " + results.response + ", Which Account?"); 
    },
    function (session, results) {
        session.dialogData.primaryContact = results.response;
        builder.Prompts.text(session, "Who is the Primary Contact?");
    },
    function (session, results) {
        session.dialogData.startDate = results.response;
        builder.Prompts.time(session, "What is the start date?");
    },
    function (session, results) {
        session.dialogData.closeDate = results.response;
        builder.Prompts.time(session, "What is the close date?");
    },
    function (session, results) {
        session.dialogData.msa = results.response.entity;
        session.send("Got it... I have created your MSA! ");
    }
]);

//CREATE NDA

bot.dialog('/createNDA', [
    function (session) {
        builder.Prompts.text(session, "Hello... my name is Aptbot. What's you name?");
    },
    function (session, results) {
        session.dialogData.accountName = results.response;
        builder.Prompts.text(session, "Hi " + results.response + ", Which Account?"); 
    },
    function (session, results) {
        session.dialogData.primaryContact = results.response;
        builder.Prompts.text(session, "Who is the Primary Contact?");
    },
    function (session, results) {
        session.dialogData.startDate = results.response;
        builder.Prompts.time(session, "What is the start date?");
    },
    function (session, results) {
        session.dialogData.closeDate = results.response;
        builder.Prompts.time(session, "What is the close date?");
    },
    function (session, results) {
        session.dialogData.nda = results.response.entity;
        session.send("Got it... I have created your NDA! ");
    }
]);


// CREATE SOW

bot.dialog('/createSOW', [
    function (session) {
        builder.Prompts.text(session, "Hello... my name is Aptbot. What's you name?");
    },
    function (session, results) {
        session.dialogData.accountName = results.response;
        builder.Prompts.text(session, "Hi " + results.response + ", Which Account?"); 
    },
    function (session, results) {
        session.dialogData.primaryContact = results.response;
        builder.Prompts.text(session, "Who is the Primary Contact?");
    },
    function (session, results) {
        session.dialogData.startDate = results.response;
        builder.Prompts.time(session, "What is the start date?");
    },
    function (session, results) {
        session.dialogData.closeDate = results.response;
        builder.Prompts.time(session, "What is the close date?");
    },
    function (session, results) {
        session.dialogData.sow = results.response.entity;
        session.send("Got it... I have created your SOW! ");
    }
]);



//CREATE OPPORTUNITY

bot.dialog('/createOpportunity', [
    function (session) {
        builder.Prompts.text(session, "Hello... my name is Aptbot. What's you name?");
    },
    function (session, results) {
        session.dialogData.opportunityName = results.response;
        builder.Prompts.text(session, "Hi " + results.response + ", What is the Opportunity's Name?"); 
    },
    function (session, results) {
        session.dialogData.account = results.response;
        builder.Prompts.text(session, "Which account is it associated to?");
    },
    function (session, results) {
        session.dialogData.revenue = results.response;
        builder.Prompts.text(session, "What is the Pricelist?");
    },
    function (session, results) {
        session.dialogData.currency = results.response;
        builder.Prompts.number(session, "What is the Currency?");
    },
    function (session, results) {
        session.dialogData.closeDate = results.response;
        builder.Prompts.date(session, "What is the Close Date");
    },
    function (session, results) {
        session.dialogData.type = results.response.entity;
        session.send("Got it... I have created your Opportunity! ");
    }
]);


//CREATE QUOTE

bot.dialog('/createQuote', [
    function (session) {
        builder.Prompts.text(session, "Hello... my name is Aptbot. What's you name?");
    },
    function (session, results) {
        session.dialogData.quoteNumber = results.response;
        builder.Prompts.number(session, "Hi " + results.response + ", Which quote would you like to configure?"); 
    },
    function (session, results) {
        session.dialogData.product = results.response;
        builder.Prompts.choice(session, "Which product do you want to add?", bladeServers);
    },
    function (session, results) {
        session.dialogData.quantity = results.response;
        builder.Prompts.number(session, "How many Blade Servers?");
    },
    function (session, results) {
    	session.dialogData.discount = results.response;
    	builder.Prompts.number(session, "What discount?");
    },
    function (session, results) {
    	session.dialogData.confirmation = results.response;
    	builder.Prompts.choice(session, "Do you want to finalize the Cart", ["Finalize", "Add More Products"]);
    },
    function (session, results) {
    	session.dialogData.nameAgain = results.response.entity;
    	session.send("Got it... I have configured your quote! ");
    }
]);



// LUIS NATURAL LANGUAGE PROCESSING 

var model = process.env.model || 'https://api.projectoxford.ai/luis/v1/application?id=6bce4284-450b-47f7-acdc-003c95c92f4f&subscription-key=9ceaa7a6ab9d4f11851bd28c80521d71'
var recognizer = new builder.LuisRecognizer(model);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });
// var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

bot.add('/', new builder.IntentDialog('https://api.projectoxford.ai/luis/v1/application?id=6bce4284-450b-47f7-acdc-003c95c92f4f&subscription-key=9ceaa7a6ab9d4f11851bd28c80521d71')
    intents.matches('CreateNDA', '/createNDA')
    intents.matches('CreateMSA', '/createMSA')
    intents.matches('CreateSOW', '/createSOW')
    intents.matches('CreateAccount', '/createAccount')
    intents.matches('CreateOpportunity', '/createOpportunity')
    intents.matches('CreateContact', '/createContact')
    intents.matches('CreateQuote', '/createQuote')
    intents.matches('CreateAgreement', '/createAgreement')
    intents.onDefault(builder.DialogAction.send("I'm sorry. I didn't understand."))
);

// MANUAL VERSION
/*
dialog.matches('builtin.intent.createContact', [
	function (session, args, next) {
		var firstName = builder.EntityRecognizer.findEntity(args.entities, 'builtin.createContact.firstName');
		var lastName = builder.EntityRecognizer.findEntity(arg.entities, 'builtin.createContact.lastName');
		var phone = builder.EntityRecognizer.findEntity(arg.entities, 'builtin.createContact.phone');
		var email = builder.EntityRecognizer.findEntity(arg.entities, 'builtin.createContact.email');
		var contact = session.dialogData.contact = {
			firstName: firstName ? firstName.entity: null,
			lastName: lastName ? lastName.entity: null,
			phone: phone ? phone.entity: null,
			email: email ? email.entity: null
		};

		if (!contact.firstName) {
			builder.Prompts.text(session, 'What is the contacts first name?');
		} else {
			next();
		}
	},
	function (session, results, next) {
	 	var firstName = session.dialogData.contact;
	 	if (results.response) {
	 		contact.firstName = results.response;
	 	}
	 },
	 function (session, results) {
        session.dialogData.lastName = results.response;
        builder.Prompts.text(session, "What is the Contact's Last Name?");
    },
    function (session, results) {
        session.dialogData.phone = results.response;
        builder.Prompts.number(session, "What is the Phone Number?");
    },
    function (session, results) {
        session.dialogData.email = results.response;
        builder.Prompts.text(session, "What is the Email?");
    },
    function (session, results) {
        session.dialogData.contact = results.response.entity;
        session.send("Got it... I have created your Contact! ");
    }
]);
*/
