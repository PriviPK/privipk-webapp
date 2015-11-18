Inbox App Scaffold - HTML5
========

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


### Using your local Inbox instance

Already running the sync engine and API server in a VM on your local machine?  [Set your App ID](http://inboxapp.github.io/inbox-scaffold-html5/set-app-id.html) to `localhost` and the Inbox HTML5 Scaffold will connect to `http://nylas:5555` instead of our API endpoint. Note, you need to have an `/etc/hosts` entry for
`nylas` that maps to the IP of the VM. This IP is 192.168.10.200 by default.

(I figured this out by looking [here](https://github.com/nylas/inbox-scaffold-html5/commit/708afdb061bc228883c31f37c71ba6c5a9c185cd))

### Getting Started

    bash

    cd inbox-scaffold-html5

    ./reinstall-nodejs.sh

    # NOTE: exit this shell, open a new one

    ./install-npms.sh

    # FIRST:
    # The email web app will attempt to contact the sync engine at 
    # http://nylas:5555 => map the IP of your sync engine VM to 'nylas' 
    # by editing your /etc/hosts file
    #
    #   $ vim /etc/hosts
    #   192.168.10.200  nylas

    # Start the web app

    ./start.sh

    # Assuming you have the Nylas sync engine running in the VM and reachable
    # at http://nylas:5555, you can now go to http://localhost:7000
    #
    # The web interface will ask you to set the appid. Enter 'localhost' (no
    # quotes). Now you should be able to use the web interface to manage the 
    # email account you registered with the sync-engine (bin/inbox-auth)

### Accessing multiple accounts

If you have multiple sync-engine VMs and want to access their accounts on the
same machine, use the following hack:

 1. Add an entry for each machine in /etc/hosts
    - If VM `i` has ip `ip[i]`, then add an entry in /etc/hosts:
      + `ip[i] nylas$i` (replace `$i` with the value of `i`)
      +  Example: 
          - `192.168.10.201 nylas1`
          - `10.0.0.3 nylas3`
          - etc.
 2. Now, when you connect to the inbox webapp and you are asked for the Inbox
    App ID, enter `nylas$i` if you want to access the account on VM `i`.
    - The app ID gets cached in the browser, so if you want to access multiple
      VMs, you'll need to use different browser sessions or different browsers

