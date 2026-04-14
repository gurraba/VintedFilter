# A script for filtering Vinted listings by country

Have you ever used Vinted? Then you've most likely noticed the inability to filter listings by country.
This script does not allow you to choose specific countries to show, but rather filters out every country 
that uses a **different currency** than yours, and listings that **contain certain languages**.

For example, if you live in sweden, this filter will hide listings from poland, Finland, and Denmark.

If a user that lives in a country with a different currency than your own, Vinted will translate
their price into your local currency _exactly_, which means that it will contain decimals. By filtering out these listing
we can hide listings that are made with a different currency.

In case your country uses the same currency as the countries you want to filter out, you can also
use a word filter. Common words from Polish, Finnish, and Swedish listings are available by default.

You can simply comment out some lines in order change the critera in the script. Very little programming experience
should be required to modify the behaviour.


## How do you run it? 

To run the script you'll have to use Tampermonkey, a popular plugin for most major browsers.
Tampermonkey allows you to run custom scripts in your browser. If you decide to use other scripts, make sure to only run things you trust.

After downloading Tampermonkey, you can simply paste a the code from this repository into a new project in tampermonkey.
*The code will run when accessing Vinted.se.* You can change this behaviour at the top of the script, in the *'matched'* section.

This script is free for you to use and modify however you wish,
and, just to be sure: it comes with **NO WARRANTY, IMPLIED OR OTHERWISE**
