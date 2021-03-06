# To-do List App for iOS
A basic to-do list project for the technical interview. 

### Author
[Jiawei Luo](http://mrkiddo.github.io) <jluo3036@gmail.com>

### Technical Features

* Hybrid application for iOS based on Ionic/Cordova framework
* Back-end based on PHP and MySQL, [back-end script](https://github.com/mrkiddo/todo/tree/master/php) can be accessed in php folder
* User authorization part is based on the service from [Firebase](https://www.firebase.com/) to provide more sophisticated user control 

### Fast installation

1. Download the file and unzip the folder "todo" under Mac OS X
2. Open Terminal and type following command*.
First, use `cordova platform add ios`, then `ionic build ios` followed by `ionic run ios` The app will run on a iOS simulator. 
Besides, you can test on the browser `ionic serve`
  
  *Here assume you already install ionic/cordova cli as well as XCode. 
3. Enjoy

### Fast usage guide
1. You would see a login page at first. If you already setup an account, you can login or if you don't, register a new one simply using
your email address and password.
2. Push the 'New item' on the top and create some to-do items.
3. Once you add the item, you can change the state of a item or even delete it.
4. You can sign out your account under the account tab.
5. The refresh is in case of data communication issues, even though you don't need it for most of the time.

### Project report
Non-technical [project report] (https://github.com/mrkiddo/todo/blob/master/report.md) can be accessed here.

### Data Dictionary
##### A brief data dictionary for this project, a "todo-items" table is used to store all the records from users.
![data](http://i11.tietuku.com/3dc31ad9dea036ce.jpg)

### Screenshots
#####Todo list view
![Todo list view](http://i11.tietuku.com/7c1403ad4a8bdb11.jpg)
#####Create new item
![Create new item](http://i11.tietuku.com/3b33ea0f6281399f.jpg)
#####Account view
![Account view](http://i11.tietuku.com/586f31ace7f59ec0.jpg)
#####Log-in view
![Login view](http://i11.tietuku.com/381d668f41d866a9.jpg)
#####Sign-up view
![Sign-up view](http://i11.tietuku.com/ce7d1f18d0e563a5.jpg)
