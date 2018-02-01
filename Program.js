var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY3YjY1NThhMzRiZjIwZWJhZjJlM2JiNmQ4ZDMzMGIzN2EyZmI0OGRh' +
              'MzRlMmE5OTM0YjcwYjcxZDVmOWM1ZTc2YTYzMGY4MWI1OGFkZmJlIn0.eyJhdWQiOiIxMCIsImp0aSI6IjY3YjY1NThhMzRiZjIw' +
              'ZWJhZjJlM2JiNmQ4ZDMzMGIzN2EyZmI0OGRhMzRlMmE5OTM0YjcwYjcxZDVmOWM1ZTc2YTYzMGY4MWI1OGFkZmJlIiwiaWF0Ijox' +
              'NTE2NDc2ODA5LCJuYmYiOjE1MTY0NzY4MDksImV4cCI6MTgzMjAwOTYwOSwic3ViIjoiODQ3Iiwic2NvcGVzIjpbInVzZXJCYXNl' +
              'SW5mbyIsInVzZXJEZXRhaWxlZEluZm8iLCJ1c2VyQ291cnNlSW5mbyJdfQ.EFVWiCUKoduHj595K2snqhbE8K1ELeSeCgue8evEJ' +
              'FoZGtf7a5Tm6-rdtvb_ZPo-TzdX2icH6dy4hsTtB2WAxU5-V-VjbtCf4jsUu-pMmba4e8cEDCWz4GrmfGmS1uF2YSr4LOH0eqdkj' +
              'x43d99PVbwQnW04ZYtQrMpQvZ2dxoZFrvPptMWbrEu2LHdCGz3PPfoDb4MPWHdWXq5d7HJS_LL-r0dm4C9j3qw5c6o7iX9kyjzm8' +
              '3SV0hEKh9-ouvROPZ2SFD0oITPJ33Yqcq-z7BdR3M_DJ2pV2mT1pTmmtm7qsvDBDLT4QGoPYtsoOP9PQ4lqgObYSG4uOK3BMdEY8' +
              '3KYFzjQzH_P1Ujn6g0COjXTKJ9PQ0XVHn2lSBl0Tj8cFKpyVSma_KXeq4i_Ie9sW25AHgBkDVD7ziLK5dtlJDzUB9zhdRD9RmPFg' +
              '3XQ3zonbeRZ5u_8ZTEmBhe0eeIQVGH67ONp9aB8tQVdSQZ2q19Tz5w0tV0DRNy5lj30XMeO3JL76qSwJSNI4wwe4RQIQ-Q88PAzM' +
              'TWNiGfifETn73zsRC-S-AfTnnJKBpfvXpnNNup8VyVhJM5s62Ff62qXG9QwKcwuXttD5WKRAgT-9uckh2tnVvfJf1QAhD7-6C6_k' +
              'qWAXD8gKgryiNNwtmKAUfMV_cMukCdHjiqsgGPApi4';

 var client = new INTITAClient({key:API_KEY});
 
 client.getUserDetails(function (error, userData) {
	var avatar = document.getElementById('avatarImg');
	avatar.setAttribute("src", userData.avatar);

	var studentName = document.getElementById('studentName');
	studentName.innerText = userData.firstName + ' ' +userData.secondName;

	var aboutMe = document.getElementById('aboutMe');
	aboutMe.innerText = userData.aboutMy;

	var city = document.getElementById('city');
	city.innerText = userData.city;

	var interests = document.getElementById('interests');
	interests.innerText = userData.interests;

	var trainers = document.getElementById('trainers');
	for (var i = 0; i < userData.trainers.length; i++) {
		var trainerName = createElement("label");
		trainerName.innerText = userData.trainers[i].secondName + " " + userData.trainers[i].firstName + "; ";
		trainers.appendChild(trainerName);
	}
	
	var phone = document.getElementById('phone');
	phone.innerText = userData.phone;

	var email = document.getElementById('email');
	email.innerText = userData.email;
	email.href = 'mailto:'+userData.email;

	var facebook = document.getElementById('facebook');
	facebook.innerText = userData.facebook;
	facebook.href = userData.facebook;
});

client.getUserCoursesAndModules(function(error, userData) {
	var courcesContainer = document.getElementById('coursesContainer');
	for(var i = 0; i < userData.courses.length; i++) {
		var courceContent = createElement("div");
		courcesContainer.appendChild(courceContent);
		printCourseInfo(userData.courses[i], courceContent);
	}
});

function printCourseInfo(course, canvas) {
	var courseTitle = createElement("label", null, "category");
	canvas.appendChild(courseTitle);
	courseTitle.innerText = course.title;
	courseTitle.addEventListener("click", onElementClick);
	
	var courseModules = createElement("ul");
	courseModules.style.display = "none";
	canvas.appendChild(courseModules);
	courseTitle.relatedContent = courseModules;
	client.getCourseModules(course.id, function (error, moduleData) {
		for (var i = 0; i < moduleData.length; i++) {
			var moduleContent = createElement("li");
			courseModules.appendChild(moduleContent);
			printModuleInfo(moduleData[i], moduleContent);
		}
	});
}

function printModuleInfo(module, canvas) {
	var moduleTitle = createElement("label");
	canvas.appendChild(moduleTitle);
	moduleTitle.innerText = module.title;
	moduleTitle.addEventListener("click", onElementClick);
	
	var moduleLectures = createElement("ul");
	moduleLectures.style.display = "none";
	canvas.appendChild(moduleLectures);
	moduleTitle.relatedContent = moduleLectures;
	client.getModuleLectures(module.id, function (error, lecturesData) {
        for (var i = 0; i < lecturesData.length; i++) {
			var lecture = createElement("li");
			moduleLectures.appendChild(lecture);
			lecture.innerText = lecturesData[i].title;
        }
    });
}

function onElementClick(event) {
	var content = event.currentTarget.relatedContent;
	var display = content.style.display == "none" ? "block" : "none";
	content.style.display = display;
}

function createElement(type, id = null, styleClass = null) {
	var el = document.createElement(type);
	if(id != null) el.setAttribute("id", id);
	if(styleClass != null) el.setAttribute("class", styleClass);
	return el;
}