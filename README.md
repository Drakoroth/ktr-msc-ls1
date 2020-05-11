# ktr-msc-ls1

BCM is a social network business card management application.

# How the application works:

* There are an user account creation system and an user connection system allowing a user to create an account in order to create their business cards (bcard).

* Each user has a library and a "bcards book" at their disposal.

* In this "bcard_book" are stored the bcards that the user has created.

* The "search bcards" page lists all the business cards of all the users on the platform.
  Once a bcard has been added, it no longer appears on the "search bcards" page, it will only appear in the user's "bcards book"
  The bcards appearing on the "search bcards" page only show the identity of the person and their company (if indicated)..

* In order to access the person's contact details, they must be added to their "bcards book" and then there's a link which allows the user to go to see their profile.

# Use the app locally

* Download the git repository.

* "node" et "npm" must be installed on the machine.

* Import the "bcm.sql" file into the DBMS.

* Go into the repository, and use the "npm install" command to install all the dependencies listed in package.json.

* Once this is done, type the command "node app.js" in order to start the application.

* Modify the "bdd.js" file if necessary in order to enter your parameters for the database.

# What is missing ?

* Password encryption in the database -> node bcrypt package version issue

* Display errors messages in the various forms.

* Delete function for the bcards.
