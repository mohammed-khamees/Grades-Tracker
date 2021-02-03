'use strict';

const form = document.getElementById('form');
const table = document.getElementById('table');

const clearBtn = document.querySelector('.clear');

//constructor function
function Student(name, course) {
	this.name = name;
	this.course = course;
	this.grade = genrateGrades();
	Student.prototype.allStudents.push(this);
}

Student.prototype.allStudents = [];

if (localStorage.getItem('students')) {
	Student.prototype.allStudents = JSON.parse(localStorage.getItem('students'));
	tableHeader();
	studentData();
} else {
	clearBtn.classList.add('hide');
}

//student Creater
form.addEventListener('submit', addStudent);

function addStudent(e) {
	e.preventDefault();
	const studentName = e.target.name.value;
	const courseName = e.target.course.value;

	new Student(studentName, courseName);
	table.innerHTML = '';
	tableHeader();
	studentData();

	clearBtn.classList.remove('hide');

	localStorage.setItem(
		'students',
		JSON.stringify(Student.prototype.allStudents),
	);

	e.target.name.value = '';
}

// table creaters functions
function tableHeader() {
	const headerRow = document.createElement('tr');

	const studentNameCol = document.createElement('th');
	studentNameCol.textContent = 'Student Name';
	headerRow.appendChild(studentNameCol);

	const studentGradeCol = document.createElement('th');
	studentGradeCol.textContent = 'Student Grade';
	headerRow.appendChild(studentGradeCol);

	const courseNameCol = document.createElement('th');
	courseNameCol.textContent = 'Course';
	headerRow.appendChild(courseNameCol);

	const resultCol = document.createElement('th');
	resultCol.textContent = 'Results';
	headerRow.appendChild(resultCol);

	table.appendChild(headerRow);
}

function studentData() {
	for (let i = 0; i < Student.prototype.allStudents.length; i++) {
		const headerRow = document.createElement('tr');

		const studentNameCol = document.createElement('td');
		studentNameCol.textContent = Student.prototype.allStudents[i].name;
		headerRow.appendChild(studentNameCol);

		const studentGradeCol = document.createElement('td');
		studentGradeCol.textContent = Student.prototype.allStudents[i].grade;
		headerRow.appendChild(studentGradeCol);

		const courseNameCol = document.createElement('td');
		courseNameCol.textContent = Student.prototype.allStudents[i].course;
		headerRow.appendChild(courseNameCol);

		const resultCol = document.createElement('td');
		if (Student.prototype.allStudents[i].grade >= 50) {
			resultCol.textContent = 'Pass';
		} else {
			resultCol.textContent = 'Fail';
		}
		headerRow.appendChild(resultCol);

		table.appendChild(headerRow);
	}
}

//generate the grades
function genrateGrades() {
	return Math.floor(Math.random() * 101);
}

//clear btn
clearBtn.addEventListener('click', (e) => {
	e.preventDefault();
	table.innerHTML = '';
	localStorage.removeItem('students');
	Student.prototype.allStudents = [];
	clearBtn.classList.add('hide');
});
