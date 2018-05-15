---------------------------

# fiberfox app

---------------------------

## Configuration of the development enviroment

1. Requirements 

	NodeJS, NPM

2. Before you run the project

	a. open the project root folder
	
	b. cd /client 
	c. npm install 

	d. cd /server 
	e. npm install 

3. Run the project 

	To successfuly run the project run node server and then run angular app. 
	
	Run node server by: 
	a. cd /server 
	b. npm start 

	Run angular app by: 
	c. cd /client 
	d. ng serve -o (-o to open the app in the browser once ng serve is ready) 

3. Editor or IDE 

	Visual Studio code has been used for development. However you are free to continue in any other. 

-----------

## fiberfox-client application architecture description 

### Directory structure, components and services...

1. The client source code resides in `/client/src`
	
	a. in `/client/src` you can find 
		
		I.   `index.html` 
		
		II.  `style.css` which contains stylesheet imports  
		
		III. `/assets` forlder containing fonts, images and global styles 
		
		IV.  other configuration files 


	b. in `src` folder you can find `app` folder which contains major part of source code 
		I.   `app` folder is divided between `/admin`, `/account` & public components  </br>
		
		II.  `/services` folder contains services mainly for admin dashboard  </br>
		
		III. `/account` components (components for just logged in regular user) use services usually suffixed with `-front`. They are designed for regular user.  </br>
		
		IV.  in `/shared/` folder you can find `base-http.service.ts` which is base class for services - containing basic http methods with auth headers.  </br>
		
		V.	 in `/services/` folder you can find `default.service.ts` which executes standard queries to for get, get/:id, post, delete, etc.  </br>
		
		VI.  in `/shared/` folder there is a model class `shared-data.model.ts`. This class accumulates user actions - all the information he provided to the app. 

		i.e. selected topic, answered question, selected options in target filtering, etc. In the result component it eventually ends in database as kind of log data.  </br>

	c. Finally and most importantly - app.module.ts contains the main app and its navigation routes.  </br>

2.	dist directory: created after the build process and contains the project files of the application. 
	a. run by `ng build` 

3. 	node_modules directory: contains all installed dependencies 

4.	package.json: this file contains besides the list of all dependencies which will install by the package manager, project attributes such as name, version, description and license. Also, dependencies only necessary for development. 

5.	tsconfig.json contains compilation options 


## fiberfox-server application description  

1. server-side REST API service is written in NodeJS. `mssql` library is used as a database communicator. 
	a. You can check out `mssql` package on github or install with `npm install mssql` 

2. API routes are defined in `/routes` folder. All together. As a TODO they need to be split into their own files. 

3. `app.js` is an entry point for the api with a useless function on `/` route. 

4. Each entity usually has its own controller.  
	a. There is separate controller used for regular user requests called: `_front-controller.js` (underscore for keeping it on top of the folder) </br>

	b. There is a generic controller defined `baseController.js` which contains basic http function handlers with default error processing.  </br>

	c. Every other controller derives from base. And usually overrides post and patch methods for add/update - as they usually are entity specific.  </br>

	d. In `routes/` you can find `secureRoutes.js` which has authentication handler and issues jwt. It also validates calls whenever authenticated request is to be processed.  </br>

	e. There is also `admin-router.js` which checks if the request is authorized for dashboard admin operations.  </br>

	f. `config/settings` hold database account and settings data. Optionally other config values may be added free of charge.  </br>

	g. (if you check in code to server consider explaining behaviour here...)  </br>