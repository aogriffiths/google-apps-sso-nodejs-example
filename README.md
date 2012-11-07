google-apps-sso-nodejs-example
==============================

A Single Sign On (SSO) example from Google Apps to a node.js app

## Introduction
If you have 
[Google Apps](http://www.google.com/enterprise/apps/) 
(AKA Google-Apps-For-Your-Domain), among many other things, you can use the
[Market PLace](https://www.google.com/enterprise/marketplace/) 
to add third  party apps to your domain. A link to these apps can be put in
your Universal Nav and if you follow the link you are automatically and 
siglently signed in to the app.

If you have ever wondered how to build a third party app like this, then this
document is for you! It's not too hard (and well documented) to do it on
AppEngine, but AppEngine may not be the right place for you.

This document will show you how to:
- Define an App, that can be added to your Google Apps domain. (And you could
go furthur to list it in the Google Apps Marketplace, for anyone to install on 
their Google Apps domain.)
- Allow that app to use OpenID to get "silent" single single on with you Google 
Apps domain. That is to say your users will not need to explicitly approve 
anything - if they are already signed in to your Google Apps domain they will
automatically get signed in to your app. (The trust has essentially been 
established at a domain level, when your administrator added the app to your
domain, in the point above.) For more information see 
[Google Apps Marketplace SSO](https://developers.google.com/google-apps/marketplace/sso)

Finally, if your interested in the exact flavour of OpenID being used to achive this
see the 
[Protocol Documentation](https://sites.google.com/site/oauthgoog/fedlogininterp/openiddiscovery)
of OpenID IDP for Google hosted domains

## Ingredients
The principles apply to building an app in any technology but for this example
we're using:
- node.js for the app.
- Heroku for the hosting.

It uses OpenID, which you could code from scratch, but you'll save
time and pain by using an OpenID library which can follow the Google specific 
extensions. The ones we're using are:
- passport-google for node.js. Which depends on,
- openid for node.js. 

(At the time of writing
[this fix](https://github.com/aogriffiths/node-openid/commit/d798cb4998935afbe905b58cb0ff710005b9d226)
was also required).

Finally, it probably goes without saying, but you're going to need a Google Apps
domain to work with! You can get one for free 
[here](https://www.google.com/a/cpanel/standard/new3).
