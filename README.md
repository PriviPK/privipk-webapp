PriviPK web app 
===============

This was previously known as 'Inbox App Scaffold - HTML5', and was built by the Nylas folks.

Connecting the web app to the sync-engine VM accounts
-----------------------------------------------------

**IMPORTANT:** We assume you have followed the guide [here](https://github.com/PriviPK/privipk-sync-engine/blob/master/README.md) and launched the PriviPK sync engine(s) in two VMs on your host machine.

We will setup the web application on your local machine. This has been tested to work on Nov. 19th, 2015 on Ubuntu 14.04 with nodejs v0.10.25 and npm 2.8.4. God and JavaScript-brogrammers willing, it should not break in the future. However, past experience indicates that a nodejs/npm project left untouched for a couple of months will miraculously not compile anymore, due to a JS dependency hell that npm/nodejs was supposed to prevent in the first place.

**Steps** (assuming sync engines VMs are setup and connected to email accounts):

 1. Add the following entries to your host machine's `/etc/hosts` file:
        
        192.168.10.200  nylas0
        192.168.10.201  nylas1

 2. Install the prerequisites for the PriviPK webapp on the host machine:

        cd inbox-scaffold-html5/
        # WARNING: This will remove and reinstall nodejs
        ./reinstall-nodejs.sh
        # NOTE: Exit this shell and open a new one
        # Otherwise, the new nodejs package manager (npm) version will not work
        ./install-npms.sh
 
 3. Start the web app just _ONCE_

        ./start.sh

 4. Open two different browser sessions (You can do one normal and one incognito session. Or one Firefox and one Chrome.).
    - Go to `http://localhost:7000` in each browser session.
    - Enter `localhost-0` as the App ID for the 1st browser session
      + This will connect to the account setup on the `nylas0` VM
    - Enter `localhost-1` as the App ID for the 2nd browser session
      + This will connect to the account setup on the `nylas1` VM
    - Now you should be able to use the web interface to separately use the 
email accounts you registered with the sync-engine VMs.

 5. Try sending and receiving emails between the two accounts.

**Note to self:** Figured out AppID stuff by looking [here](https://github.com/nylas/inbox-scaffold-html5/commit/708afdb061bc228883c31f37c71ba6c5a9c185cd).

### Accessing multiple accounts

In general, if you have multiple sync-engine VMs and want to access their accounts on the same machine, do the following:

 1. Add an entry for each VM on your host machine's `/etc/hosts`
    - If VM `i` (from 0 to `n`) has ip `ip[i]`, then add an entry in your host's `/etc/hosts`:
      + `ip[i] nylas$i` (replace `$i` with the value of `i`)
      +  Example: 
          - `192.168.10.201 nylas1`
          - `10.0.0.3 nylas3`
          - etc.
 2. Now, when you connect to the inbox webapp and you are asked for the Inbox
    App ID, enter `nylas$i` if you want to access the account on VM `i`.
    - **IMPORTANT:** The app ID gets cached in the browser, so if you want to access multiple VMs, you'll need to use different browser sessions or different browsers

Deploying the webapp in a VM
----------------------------

It could be easier to deploy the webapp in a VM instead of deploying it on your host machine. Thus, we provided a `Vagrantfile`. 

**Steps**:

 1. Launch the VM: `vagrant up`

 2. SSH in the VM: `vagrant ssh`

 3. Edit the `/etc/hosts` file on the VM (same way as explained above)

 4. Install node and NPMs on the VM. As explained above, but specifically:
    
        `cd /vagrant`
        ./install-nodejs.sh
        ./install-npms.sh

 5. Start the webapp in the VM
        
        ./start.sh

 6. Open two browser sessions, except you'll be accessing the web app at `http://192.168.10.202:7000` (the VM's address) instead of `http://localhost:7000`
    - **IMPORTANT:** However, the AppID's will continue to be `localhost-0` and `localhost-1`


Old Inbox App description
-------------------------

The Inbox HTML5 Scaffold is a full-featured mail client built on top of the Inbox API. It is a client-side AngularJS application that leverages the [Inbox Javascript SDK](https://github.com/inboxapp/inbox.js), and is intended to be a foundation for you to build your own mail client or add features that you've always wanted!

The Inbox HTML5 App Scaffold includes support for:

- Authenticating entirely client-side
- Browsing your Inbox, Drafts, and Archive
- Viewing threads
- Viewing and downloading message attachments
- Archiving threads
- Filtering threads
- Replying to threads with attachments
- Saving, editing, and sending drafts

<a href="https://raw.githubusercontent.com/inboxapp/inbox-scaffold-html5/master/screenshots/screenshot_threads.png"><img src="https://raw.githubusercontent.com/inboxapp/inbox-scaffold-html5/master/screenshots/screenshot_threads.png" height="230" /></a>
<a href="://raw.githubusercontent.com/inboxapp/inbox-scaffold-html5/master/screenshots/screenshot_thread.png"><img src="https://raw.githubusercontent.com/inboxapp/inbox-scaffold-html5/master/screenshots/screenshot_thread.png" height="230" /></a>

<a href="https://raw.githubusercontent.com/inboxapp/inbox-scaffold-html5/master/screenshots/screenshot_reply.png"><img src="https://raw.githubusercontent.com/inboxapp/inbox-scaffold-html5/master/screenshots/screenshot_reply.png" height="230" /></a>
<a href="://raw.githubusercontent.com/inboxapp/inbox-scaffold-html5/master/screenshots/screenshot_compose.png"><img src="https://raw.githubusercontent.com/inboxapp/inbox-scaffold-html5/master/screenshots/screenshot_compose.png" height="230" /></a>

Yes, it even has a dark theme:

<a href="https://raw.githubusercontent.com/inboxapp/inbox-scaffold-html5/master/screenshots/screenshot_dark_theme.png"><img src="https://raw.githubusercontent.com/inboxapp/inbox-scaffold-html5/master/screenshots/screenshot_dark_theme.png" height="230" /></a>
