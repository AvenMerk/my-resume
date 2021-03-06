let data = '%data%';

let bio = {
  "name": "Aleksandra Bystrova",
  "role": "Junior front-end developer",
  "contacts" : {
    "mobile": "89772731836",
    "email": "kremnevaaj@gmail.com",
    "github": "AvenMerk",
    "location": "Moscow, Russia",
  },
  "welcomeMessage": "Hi, I'm Sasha. Welcome to my portfolio! ^_^",
  "skills": ["junior JavaScript", "HTML", "CSS", "React/Redux", "basic knowledge about SQL, Node.js, jQuery"],
  "biopic": "./images/Photo.jpg"
};

let education ={
  "schools": [
    {
      "name": "Far East State University",
      "location": "Vladivostok, Russia",
      "degree": "bachelor",
      "majors": ["Physics"],
      "dates": "2010-2014",
      "url": "<a href='https://www.dvfu.ru/en/'>dvfu.ru</a>"
    }, 
    {
      "name": "National Research Nuclear University MEPhI (Moscow Engineering Physics Institute)",
      "location": "Moscow, Russia",
      "degree": "master",
      "majors": ["Physics"],
      "dates": "2014-2016",
      "url": "<a href='https://eng.mephi.ru/'>mephi.ru</a>"
    }
  ],       
  "onlineCourses": [
    {
      "title": "Front-End Web Developer Nanodegree Program",
      "school": "Udacity",
      "dates": "February 2018 - July 2018",
      "url": "<a href='https://classroom.udacity.com/nanodegrees/nd001/'>https://classroom.udacity.com</a>"
    }
  ]
};

let work = {
  "jobs": [
  {
    "employer": "Ltd Akira-Oil",
    "title": "Programmer", 
    "location": "Moscow, Russia",
    "dates": "July 2016 - December 2017",
    "description": "Administrator of 1s databases, workability support, development of reports for accounting and sales" 
  }, 
  {
   "employer": 'Private educational institution "Educational center: Harmony"',
    "title": "Teacher of physics", 
    "location": "Vladivostok, Russia",
    "dates": "September 2013 - June 2014",
    "description": "Teacher of physics for 7-11 classes"
  }]          
};

let  projects = {
    "projects": [
        {
            "title": "Posters shop",
            "description": "Experimental react-redux project",
            "images": ["./images/posters-shop.png"],
            "url": "https://avenmerk.ru/postershop"
        },
        {
            "title": "Memory game",
            "dates": "February 2018 - March 2018",
            "description": "Creating an online memory game (part of Udacity's Front-End Web Developer Nanodegree.",
            "images": ["./images/Memory.png"],
            "url": "https://avenmerk.ru/memory-game"
        },
        {
            "title": "Arcade game",
            "dates": "April 2018 - May 2018",
            "description": "Creating an online arcade game (part of Udacity's Front-End Web Developer Nanodegree).",
            "images": ["./images/arcade.png"],
            "url": "https://avenmerk.ru/arcade-game"
        },
        {
            "title": "Pixel Art Maker",
            "dates": "March 2018 - April 2018",
            "description": "Create a webpage with canvas to make a pixel art",
            "images": ["./images/pixelart.png"],
            "url": "https://avenmerk.ru/pixel-art"
        }

    ]
}; 

bio.display = function() {
  let formattedName = HTMLheaderName.replace(data, bio.name);
  let formattedRole = HTMLheaderRole.replace(data, bio.role);
  let formattedBioPic = HTMLbioPic.replace(data, bio.biopic);
  let formattedWelcomeMsg = HTMLwelcomeMsg.replace(data, bio.welcomeMessage);

  let formattedContactInfo = [];
  formattedContactInfo.push(HTMLemail.replace(data, bio.contacts.email));
  formattedContactInfo.push(HTMLgithub.replace(data, bio.contacts.github));
  formattedContactInfo.push(HTMLlocation.replace(data, bio.contacts.location));

  $('#header').prepend(formattedRole);
  $('#header').prepend(formattedName);
  $('#header').append(formattedBioPic);
  $('#header').append(formattedWelcomeMsg);

  for (let i = 0; i < formattedContactInfo.length; i++) {
      $('#topContacts').append(formattedContactInfo[i]);
      $('#footerContacts').append(formattedContactInfo[i]);
  }

  if (bio.skills.length > 0) {
      $('#header').append(HTMLskillsStart);

      for (let i = 0; i < bio.skills.length; i++) {
          let formattedSkills = HTMLskills.replace(data, bio.skills[i]);
          $('#skills').append(formattedSkills);
      }
  }
};

work.display = function() {
    if (work.jobs.length > 0) {
        $('#workExperience').append(HTMLworkStart);

        work.jobs.forEach(function(job) {
            let formattedEmployer = HTMLworkEmployer.replace(data, job.employer);
            let formattedWorkTitle = HTMLworkTitle.replace(data, job.title);
            let formattedEmployerTitle = formattedEmployer + formattedWorkTitle;
            let formattedWorkLocation = HTMLworkLocation.replace(data, job.location);
            let formattedWorkDate = HTMLworkDates.replace(data, job.dates);
            let formattedWorkDescription = HTMLworkDescription.replace(data, job.description);

            $('.work-entry:last').append(formattedEmployerTitle);
            $('.work-entry:last').append(formattedWorkLocation);
            $('.work-entry:last').append(formattedWorkDate);
            $('.work-entry:last').append(formattedWorkDescription);
        });
    }
};

projects.display = function() {
    if (projects.projects.length > 0) {
        $('#projects').append(HTMLprojectStart);

        projects.projects.forEach(function(project) {
            let formattedProjTitle = HTMLprojectTitle.replace(data, project.title).replace("#", project.url);
            let formattedProjDescription = HTMLprojectDescription.replace(data, project.description);

            $('.project-entry:last').append(formattedProjTitle);
            $('.project-entry:last').append(formattedProjDescription);

            if (project.images.length > 0) {
                project.images.forEach(function(projectImage) {
                  let formattedProjectImage = HTMLprojectImage.replace(data, projectImage).replace("#", project.url);
                  $(".project-entry:last").append(formattedProjectImage);
                });
            }
        });
    }
};

education.display = function() {

    for (let i = 0; i < education.schools.length; i++) {
        $("#education").append(HTMLschoolStart);
        let formattedSchoolName = HTMLschoolName.replace(data, education.schools[i].name);
        let formattedMajor = HTMLschoolMajor.replace(data, education.schools[i].majors);
        let formattedDegree = HTMLschoolDegree.replace(data, education.schools[i].degree);
        let formattedDates = HTMLschoolDates.replace(data, education.schools[i].dates);
        let formattedLocation = HTMLschoolLocation.replace(data, education.schools[i].location);
        let formattedURL = HTMLonlineURL.replace(data, education.schools[i].url);
        $('.education-entry:last').append(formattedSchoolName + formattedDegree);
        $('.education-entry:last').append(formattedDates);
        $('.education-entry:last').append(formattedMajor);
        $('.education-entry:last').append(formattedLocation);
        $('.education-entry:last').append(formattedURL);
    }

    if(education.onlineCourses.length > 0) {
        $('#education').append(HTMLschoolStart);

        if(education.onlineCourses.length > 0) {
            $('#education').append(HTMLonlineClasses);
            for (let i = 0; i < education.onlineCourses.length; i++) {
                $("#education").append(HTMLschoolStart);
                let formattedOnlineTitle = HTMLonlineTitle.replace(data, education.onlineCourses[i].title );
                let formattedOnlineSchool = HTMLonlineSchool.replace(data, education.onlineCourses[i].school );
                let formattedComplated = HTMLonlineDates.replace(data, education.onlineCourses[i].dates );
                let formattedURL = HTMLonlineURL.replace(data, education.onlineCourses[i].url );
                $('.education-entry:last').append(formattedOnlineTitle + formattedOnlineSchool);
                $('.education-entry:last').append(formattedComplated);
                $('.education-entry:last').append(formattedURL);

            }
        }
    }
};

$('#mapDiv').append(googleMap);
bio.display();
work.display();
projects.display();
education.display();
