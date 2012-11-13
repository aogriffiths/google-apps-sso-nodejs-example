Google Apps SSO node.js Example
===============================

A Single Sign On (SSO) example from Google Apps to a node.js app

## Introduction
If you have 
[Google Apps](http://www.google.com/enterprise/apps/) 
(AKA Google-Apps-For-Your-Domain) you can use the
[Market Place](https://www.google.com/enterprise/marketplace/) 
to add third party apps to your domain. A link will be put in your 
[universal navigation bar](http://support.google.com/a/bin/answer.py?hl=en&answer=172981)
and when you follow it you are automatically signed in to the app.

If you're wondering how to build a third party app like this, and host it
anywhere you like, then this document is for you! It's not too hard, and 
well documented, to do it on AppEngine. But if your not using AppEngine 
there is a little more to do.

This document will show you how to:
* Define an App, that can be added to your Google Apps domain. (And you could
  go furthur to list it in the Google Apps Marketplace, for anyone to install in 
  their domain.)
* Allow that app to use OpenID to have "silent" single single on with your Google 
  Apps domain. In order words your users will not need to explicitly approve 
  anything - if they are already signed in to Google Apps they will
  automatically get signed in to your app. (The trust has essentially been 
  established at an administrator level, when you added the app to your
  domain, in the point above.) For more information see 
  [Google Apps Marketplace SSO](https://developers.google.com/google-apps/marketplace/sso)
* Build the app outside of the google infrastructure, i.e. not on AppEngine.

Finally, if your interested in the exact flavour of OpenID being used, 
see this 
[Protocol Documentation](https://sites.google.com/site/oauthgoog/fedlogininterp/openiddiscovery)
for OpenID IdP for Google hosted domains

## Ingredients
The principles apply to building an app in any technology but we're using:
* node.js for the app.
* Heroku for the hosting.

It uses OpenID, which you could code from scratch, but you'll save
time and pain by using an OpenID library compatible with the Google specific 
extensions. The ones we're using are:
* [node-openid](https://github.com/havard/node-openid) for node.js. 
* [passport](https://github.com/jaredhanson/passport) for node.js. 
* [passport-google](https://github.com/jaredhanson/passport-google) stategy for passport.
 
At the time of writing node-openid required
[this fix](https://github.com/aogriffiths/node-openid/commit/d798cb4998935afbe905b58cb0ff710005b9d226)
to work with Google Apps.

Finally, it probably goes without saying, you're going to need a Google Apps
domain to work with! You can get one for free 
[here](https://www.google.com/a/cpanel/standard/new3).

## Preparation
0. Get a Heroku account from [heroku.com](http://www.heroku.com/) and set up the Heroku [toolbelt](https://toolbelt.heroku.com/) on your machine.
 Ensure your git ssh keys and authentication are correctly set up.
 If it's the first time you've worked with Heroku you 
 may want to create a dummy app, just to check everything is working.
0. Install [node.js](http://nodejs.org/).

Instructions PART 1 - The Basics
--------------------------------

### Fork this project
    git clone git://github.com/aogriffiths/google-apps-sso-nodejs-example.git my-google-apps-sso
This will create a local copy for you to edit. I don't recommend you push
your changes back to a public repo on github because your will soon be changing 
the configuration files to contain information specific to your Google Apps domain. 
On the otherhand, if you do make any changes to this tuotial which you think would benefit
everyone please do push them to github and send me a pull request.

### Create a Heroku app
Change directory to your fork and create a heroku app in it.

    cd my-google-apps-sso
    heroku create

This will return somthing like:

    Creating big-mountain-2233... done, stack is cedar
    http://big-mountain-2233.herokuapp.com/...

Make a note of the name and URL that Heroku has given your app. 

If you don't like it You can always change it with a:

    heroku rename <new_name>
  
  
### Create the configuration file config.js

This json stucture of config.js allows for more than one configuration. Copy the example 
from the template-files directory and edit for you own senario.  Each configuration in the
config.defs array has three entries:
* `name` - any single word e.g. my_gapps_sso
* `realm` - make this the root URL of your Heroku app e.g. 
    http://still-springs-4775.herokuapp.com
* `domain` - your Google Apps domain. 

One erty needs to be made the "default" with a:
* __default: true

The example config file has two configurations, one for testing localy, "localhost", and one
for playing with for real "production". To get these two working you should only need to 
change two parts
* `<your_google_apps_domain>` - your Google apps domain. e.g. `example.com`
* `<your_production_heroku_app>` - e.g. `http://still-springs-4775.herokuapp.com`


### Test Locally
Run:
    node web.js
Navigate to `http://localhost:5000` and use the "__localhost Sign In__" link to 
check it's  working.

### Push to Heroku
Your app is now ready, to start it running on Heroku use:
    
    git push heroku master
    
Navigate to `http://<yourapp>.herokuapp.com` and use the "__production Sign In__" link to 
check it's  working. If this is the first time you have tested your app you will get at least one message from Google:
  
__Message 1__ 

(only if you're not already logged in to Google)
> "<your_production_heroku_app>.herokuapp.com" is asking for some information from your <your_google_apps_domain> account.   
> To see and approve the request, sign in.

__Message 2__

(only you've never approved a request from this app before)
> "<your_production_heroku_app>.herokuapp.com" is asking for some 
> information from your <your_google_apps_domain> account <your_email_address>:   
> • Email address: \<your_name\> (\<your_email_address\>)

There is a "Remember this approval" check box and if you tick it you won't 
get the second message again. However, with a little extra effort you can avoid 
getting either messages, for all users in your Google Apps domain, ever.
  
If you do remember an approval you can always revoke it 
[here](https://www.google.com/accounts/IssuedAuthSubTokens)
 
 
Instructions PART 2 - Full, Silent, SSO with Google Apps
--------------------------------------------------------

This part will give you two things, firstly a link to your new app from your
Google universal navigation bar and secondly, if you click on it you won't get either of the 
two messages mentioned above - your users will be silently signed on.
  
### Prepare the Application Manifest 
Open ApplicatiomManifest.xml and edit the following fields:
* Set `<Name>` and `<Description>` to something suitable to describe your app.
* Set the `<Name>` and `<Url>` under the `<Extension id="navLink" type="link">`. These 
  describe the link to your Heroku app which will go in the universal nav so use 
  a name of your choice and the URL like:
  http://<yourapp>.herokuapp.com
* Set the `<Url>` under `<Extension id="realm" type="openIdRealm">`. This should be
  the same realm as defined in config.js. e.g. `http://<yourapp>.herokuapp.com`
  
### Prepare the Listing Manifest 
* Set the `<PurchaseUrl>`'s to something sensible. This is just an example so you
  can make them anything
* Set the `<MerchantEmailAddress>` to your Google Apps domain email address
  
### Create the App in Google Market Place
0. Navigate to your
[Vendor Profile](https://www.google.com/enterprise/marketplace/viewVendorProfile)
In Google Apps Marketplace. 
0. If you don't already have a vendor profile you'll needs to fill in 
some details. 
0. Click the button to create a new listing, if it's your first one you'll need to agree to the terms of service.
0. Be sure to tick the box "My product may be directly installed into Google Apps domains"
0. Fill in the rest of the form, most of the fields are free text and self explanatory. For the Application Manifest 
and the Listing Manifest paste in the ApplicationManifest.xml and the ListingManifest.xml files which you edited earlier.
0. Click Save and Preview. There is no need to to submit your listing for approval at this stage. 
You can always do that later, should you develop an app that that you want to publish to the world! 
  
### Add the App to your domain
Following on directly from the last step above, to test your new app it in your own domain:

0. Click the "Add it now" button, enter your Google Apps domain name and click go.
0. The next screen will say something along the lines of:
>  "You have requested that the '\<your app name\>…' service be added to your domain". 
0. Click "I agree. Continue" and you're done.

That's it. No need to follow the links to configure your app, if you switch to gmail 
now you will find it in your global navigation. Click the link and you will automatically
 be signed in to your Heroku app. 


### Problems?

It it's not working as expected, double check your Google Apps IdP setting.
Navigate to `https://www.google.com/a/cpanel/<your domain>/SetupIdp`
and ensure the options to allow users to sign in to third party websites 
using OpenID is checked.
  

  



## License 

(The MIT License)

Copyright (c) 2009-2012 AO Griffiths

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
