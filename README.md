Google Apps SSO node.js Example
===============================

A Single Sign On (SSO) example from Google Apps to a node.js app

## Introduction
If you have 
[Google Apps](http://www.google.com/enterprise/apps/) 
(AKA Google-Apps-For-Your-Domain) you can use the
[Market Place](https://www.google.com/enterprise/marketplace/) 
to add third party apps to your domain. A link will be put in your 
[universal navigtion bar](http://support.google.com/a/bin/answer.py?hl=en&answer=172981)
and when you follow it you are automatically signed in to the app.

If your wondering how to build a third party app like this, and host it
anywhere you like, then this document is for you! It's not too hard, and 
well documented, to do it on AppEngine. But if your not using AppEngine 
there is a little more to do.

This document will show you how to:
- Define an App, that can be added to your Google Apps domain. (And you could
go furthur to list it in the Google Apps Marketplace, for anyone to install on 
their Google Apps domain.)
- Allow that app to use OpenID to get "silent" single single on with you Google 
Apps domain. That is to say your users will not need to explicitly approve 
anything - if they are already signed in to Google Apps they will
automatically get signed in to your app. (The trust has essentially been 
established at an administrator level, when you added the app to your
domain, in the point above.) For more information see 
[Google Apps Marketplace SSO](https://developers.google.com/google-apps/marketplace/sso)
- Build the app outside of the google infrastucture, i.e. not on AppEngine.

Finally, if your interested in the exact flavour of OpenID being used to do this
see the 
[Protocol Documentation](https://sites.google.com/site/oauthgoog/fedlogininterp/openiddiscovery)
for an OpenID IDP for Google hosted domains

## Ingredients
The principles apply to building an app in any technology but we're using:
- node.js for the app.
- Heroku for the hosting.

It uses OpenID, which you could code from scratch, but you'll save
time and pain by using an OpenID library compatibe with the Google specific 
extensions. The ones we're using are:
- [openid](https://github.com/havard/node-openid) for node.js. 
- [passport](https://github.com/jaredhanson/passport) for node.js. With the stategy,
- [passport-google](https://github.com/jaredhanson/passport-google). Which depends on,

(also, at the time of writing
[this fix](https://github.com/aogriffiths/node-openid/commit/d798cb4998935afbe905b58cb0ff710005b9d226)
was required for openid).

Finally, it probably goes without saying, you're going to need a Google Apps
domain to work with! You can get one for free 
[here](https://www.google.com/a/cpanel/standard/new3).

## Preparation
0 Get a Heroku account and set up the heroku toolbelt on your machine.
 Test it works and ensure your ssh keys and authentication is set up
 with Heroku. If it's the first time you've worked with Heroku you 
 may want to create a dummy app, just to check everything is working.
0 Install node.js on your machine.

## Instuctions

### Git fork this project:
  $ get fork 
  This will create a local copy for you to edit. I don't recommend you push
  your changes back to github becuase the configuration files you get are 
  going to contain some private information about your Google Apps domain.

### Create a Heroku app:
  $ heroku create
  You will get output like this:
  $ a
  $ b
  Make a note of the name Heroku has given your app. You can always change 
  this if you like, with a
  $ heroku rename...
  
### Edit the configuration file config.js with:
  - name - any single word will do for this e.g. <my_gapps_sso>
  - realm - make this the root URL of your Heroku app e.g. 
    http://<yourapp>.herokuapp.com
  - google_domain - your Google Apps domain. e.g.
    http://<your-domain>
    
### Puch to Heroku
  Your app is now ready, to start it running on Heroku use:
  $ git push heroku master
  Navigate to http://<yourapp>.herokuapp.com to check its working.
  If you navigate to http://<yourapp>.herokuapp.com/autologin you should find 
  the app redirects you to Google to login or get your permision the first time. 
  You may need to use a "ingognito" session or clear all your cookies to test 
  this becuase after you have given permision to Google to share your OpenID 
  with your app the first time, you will not need to again.
  
  BUT the next steps will show you how to ensure your uses don't even need to
  give permission the first time.
  
### Prepare the Application Manifest 
  Open ApplicatiomManifest.xml and edit the following fields:
  * <Name>
  * <Description>
  * The <Name> and <Url> under the <Extension id="navLink" type="link">. These 
  should linkto your Heroku app, so use a name of your choice and the URL like:
  http://<yourapp>.herokuapp.com
  * The <Url> under <Extension id="realm" type="openIdRealm">. This should be
  the same realm as defined in config.js. e.g. http://<yourapp>.herokuapp.com
  
### Prepare the Listing Manifest 
  * Set the <PurchaseUrl>'s to something sensible. This is just an example so you
  can make them anything
  * Set the <MerchantEmailAddress> to your Google Apps domain email address
  
### Create the App in Google Market Place
  Navigate to <***>
  Create the 
  
  But don't publish it
  
### Add the App to your domain
  Click x
  You will now find the app in your universal nivigation bar. Click the link
  and you will automatically be signed in to your Heroku app. There will be no 
  step for you to give permision...


### Double check your Google Apps IdP setting
  Navigate to https://www.google.com/a/cpanel/<your domain>/SetupIdp
  and ensure the options to allow users to sign in to third party websites 
  using OpenID is checked.
  

  
Create a vendor listing by filling your details at:
https://www.google.com/enterprise/marketplace/createVendorProfile

Then create a listing, if it's your first one you'll need to agree to the terms of service.

Be sure to tick the box "My product may be directly installed into Google Apps domains"

Fill in the rest of the form, most of the fields are free text and self explanatory. For the Application Manifest and the Listing Manifest paste in the ApplicationManifest.xml and the ListingManifest.xml files which you edited earlier.

Click Save and Preview

There is no need to to submit your listing for approval at this stage. You can always do that later, should you develop an app that that you want to publish to the world! For now, just to test it in your on domain, click the Add it now button, enter your Google Apps domain name and click go.


The next screen will say something along the lines of "You have requested that the '<your app name>…' service be added to your domain". Click "I agree. Continue" and your done.

That's it. No need to follow the links to configure your app, if you switch to gmail now you will find it in your global navigation.

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
