/***********************
 * EduCore Prototype JS
 * single script for all pages
 ***********************/

/* localStorage keys */
const KEY_STUDENTS = "educore_students";
const KEY_COURSES  = "educore_courses";
const KEY_TEACHERS = "educore_teachers";
const KEY_QUIZZES  = "educore_quizzes";

/* ------------------ util functions ------------------ */
function getStore(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
function setStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function findCourseById(id) {
  return getStore(KEY_COURSES).find(c => c.id === id);
}
function getStudentById(id) {
  return getStore(KEY_STUDENTS).find(s => s.id === id);
}
function showToast(msg, time=2000){
  const t = document.getElementById('toast');
  if(!t) return alert(msg);
  t.innerText = msg; t.classList.remove('hidden');
  setTimeout(()=> t.classList.add('hidden'), time);
}

/* ------------------ seed data (run if no courses) ------------------ */
function seedAgain(){
  const courses = [
    { id:"alg-101", title:"Algoritma Dasar", materials:[
      "Pengenalan Algoritma",
      "Struktur Kontrol & Pseudocode",
      "Rekursi & Pemecahan Masalah",
      "Analisis Kompleksitas",
      "Latihan Implementasi"
    ]},
    { id:"sd-101", title:"Struktur Data", materials:[
      "Pengenalan Struktur Data",
      "Array & List",
      "Linked List",
      "Stack & Queue",
      "Tree Dasar"
    ]},
    { id:"db-101", title:"Basis Data", materials:[
      "Model Data & ERD",
      "SQL Dasar",
      "Normalisasi",
      "Query Lanjutan",
      "Index & Optimasi"
    ]},
    { id:"web-101", title:"Pemrograman Web", materials:[
      "HTML & CSS",
      "JavaScript Dasar",
      "Frontend Framework",
      "Backend & API",
      "Deployment"
    ]},
    { id:"ai-101", title:"Kecerdasan Buatan", materials:[
      "Pengenalan AI",
      "Machine Learning Basics",
      "Regresi & Klasifikasi",
      "Neural Networks",
      "Project Mini"
    ]}
  ];
  const quizzes = [
    { courseId:"alg-101", questions:[
      {q:"Apa itu algoritma?", options:["Serangkaian langkah","Jenis data","Bahasa pemrograman"], answer:0},
      {q:"Rekursi adalah ...", options:["Fungsi memanggil dirinya","Loop tak terbatas","Tipe data"], answer:0},
      {q:"Complexity O(n) berarti ...", options:["Linear","Konstan","Logaritmik"], answer:0}
    ]},
    // reuse a simple quiz for others
    { courseId:"sd-101", questions:[
      {q:"Apa struktur data linked list?", options:["Kumpulan node terhubung","Array fixed-size","Jenis algoritma"], answer:0},
      {q:"Stack LIFO singkatan dari ...", options:["Last In First Out","First In First Out","Linear In Fixed Out"], answer:0},
      {q:"Tree adalah ...", options:["Hierarki node","Linear array","Bahasa query"], answer:0}
    ]},
    { courseId:"web-101", questions:[
      {q:"HTML digunakan untuk ...", options:["Struktur halaman","Logika program","Database"], answer:0},
      {q:"CSS berfungsi untuk ...", options:["Tata letak & style","Fungsi backend","Query data"], answer:0},
      {q:"JavaScript berjalan di ...", options:["Browser","Database","Server only"], answer:0}
    ]}
  ];

  setStore(KEY_COURSES, courses);
  setStore(KEY_QUIZZES, quizzes);
  // keep students & teachers empty (do not override) unless desired:
  if(!localStorage.getItem(KEY_STUDENTS)) setStore(KEY_STUDENTS, []);
  if(!localStorage.getItem(KEY_TEACHERS)) setStore(KEY_TEACHERS, []);
  showToast("Seed data berhasil.", 1400);
}

/* Reset demo: clear all educore keys */
function resetDemo(){
  if(!confirm("Reset demo akan menghapus data lokal (mahasiswa, teacher, enroll). Lanjutkan?")) return;
  localStorage.removeItem(KEY_STUDENTS);
  localStorage.removeItem(KEY_TEACHERS);
  localStorage.removeItem(KEY_COURSES);
  localStorage.removeItem(KEY_QUIZZES);
  showToast("Data di-reset. Refresh halaman.", 1400);
}

/* init seed if missing */
if(!localStorage.getItem(KEY_COURSES)) seedAgain();

/* ------------------ STUDENT FLOW ------------------ */
/* Register student */
function registerStudent(){
  const name = document.getElementById('m_name').value?.trim();
  const email = document.getElementById('m_email').value?.trim();
  const idval = document.getElementById('m_id').value?.trim();
  const jurusan = document.getElementById('m_jurusan').value;

  if(!name || !email){ alert("Isi nama & email dulu ya."); return; }

  const students = getStore(KEY_STUDENTS);
  const sid = "mhs-" + Date.now();
  const student = { id: sid, name, email, nim:idval || "", jurusan, enrollments: {} };
  students.push(student);
  setStore(KEY_STUDENTS, students);

  // store active student id for session
  localStorage.setItem("educore_active_student", sid);
  showToast("Terdaftar! Menuju pilih mata kuliah...", 900);
  setTimeout(()=> location.href = "mahasiswa-matkul.html", 900);
}

/* Page: mahasiswa-matkul.html */
function renderCoursesPage(){
  const activeId = localStorage.getItem("educore_active_student");
  const stud = activeId ? getStudentById(activeId) : null;
  if(document.getElementById('mName')) document.getElementById('mName').innerText = stud ? stud.name : "Mahasiswa";

  const courses = getStore(KEY_COURSES);
  const wrap = document.getElementById('courses');
  if(!wrap) return;
  wrap.innerHTML = "";

  courses.forEach(c => {
    const card = document.createElement('div');
    card.className = 'course-card';
    const enrolled = stud && stud.enrollments && stud.enrollments[c.id];
    card.innerHTML = `
      <div class="course-title">${c.title}</div>
      <div class="course-desc">${c.materials.length} materi • Ilmu Komputer</div>
      <div class="course-actions">
        <button class="cta" onclick="handleCourseClick('${c.id}')">${enrolled ? 'Masuk ke Kelas' : 'Ikuti Kursus'}</button>
      </div>
    `;
    wrap.appendChild(card);
  });
}
function handleCourseClick(courseId){
  const activeId = localStorage.getItem("educore_active_student");
  if(!activeId){ alert("Silakan daftar dulu."); location.href="mahasiswa-register.html"; return; }
  const students = getStore(KEY_STUDENTS);
  const sidx = students.findIndex(s=>s.id===activeId);
  if(sidx===-1){ alert("Akun tidak ditemukan, daftar ulang."); location.href="mahasiswa-register.html"; return; }

  const course = findCourseById(courseId);
  // enroll if not yet
  if(!students[sidx].enrollments[courseId]){
    students[sidx].enrollments[courseId] = {
      materials: course.materials.map(_=>false),
      quiz: null
    };
    setStore(KEY_STUDENTS, students);
    showToast("Kamu berhasil mendaftar kursus: " + course.title, 1100);
    setTimeout(()=> location.href = "mahasiswa-kelas.html", 900);
  } else {
    // already enrolled -> go to kelas
    location.href = "mahasiswa-kelas.html";
  }
}

/* Page: mahasiswa-kelas.html */
function renderKelasPage(){
  const activeId = localStorage.getItem("educore_active_student");
  if(!activeId){ location.href="mahasiswa-register.html"; return; }
  const stud = getStudentById(activeId);
  if(document.getElementById('mName')) document.getElementById('mName').innerText = stud.name;

  // find a selected course (we choose first enrolled if multiple)
  const enrollKeys = Object.keys(stud.enrollments || {});
  if(enrollKeys.length === 0){
    showToast("Belum terdaftar di kursus manapun. Arahkan ke pilih matkul.", 1400);
    setTimeout(()=> location.href="mahasiswa-matkul.html", 900);
    return;
  }
  const courseId = enrollKeys[0]; // for prototype, use first enrollment
  const course = findCourseById(courseId);
  if(document.getElementById('courseTitle')) document.getElementById('courseTitle').innerText = course.title;

  const enrollment = stud.enrollments[courseId];
  const materiWrap = document.getElementById('materiList');
  materiWrap.innerHTML = "";

  course.materials.forEach((m, i) => {
    const done = enrollment.materials[i];
    const item = document.createElement('div');
    item.className = 'materi-item';
    item.innerHTML = `
      <div>
        <h4>Materi ${i+1}: ${m}</h4>
        <div class="materi-meta">${done ? 'Selesai ✅' : 'Belum selesai'}</div>
      </div>
      <div class="materi-actions">
        <button class="btn-inline" onclick="openMateri('${courseId}', ${i})">Pelajari</button>
      </div>
    `;
    materiWrap.appendChild(item);
  });

  // progress
  const total = enrollment.materials.length;
  const doneCount = enrollment.materials.filter(Boolean).length;
  const pct = Math.round((doneCount/total)*100);
  document.getElementById('progressPct').innerText = `${pct}%`;
  const fill = document.getElementById('progressFill');
  fill.style.width = pct + "%";

  // show kuis button if all done
  const kuisArea = document.getElementById('kuisArea');
  if(doneCount === total){
    kuisArea.classList.remove('hidden');
  } else kuisArea.classList.add('hidden');

  // store current course id for session convenience
  localStorage.setItem("educore_active_course", courseId);
}

/* open materi page with query params */
function openMateri(courseId, idx){
  // store params in sessionStorage for simpler access
  sessionStorage.setItem("educore_materi_course", courseId);
  sessionStorage.setItem("educore_materi_index", idx.toString());
  location.href = `materi.html`;
}

/* Page: materi.html */
function renderMateriPage(){
  const courseId = sessionStorage.getItem("educore_materi_course");
  const idx = Number(sessionStorage.getItem("educore_materi_index"));
  if(!courseId || isNaN(idx)) { location.href="mahasiswa-kelas.html"; return; }

  const course = findCourseById(courseId);
  const contentWrap = document.getElementById('matContent');
  document.getElementById('matkulTitle').innerText = `${course.title} — Materi ${idx+1}`;

  // dummy content
  contentWrap.innerHTML = `
    <h3>${course.materials[idx]}</h3>
    <p>Ini adalah konten materi contoh untuk <strong>${course.materials[idx]}</strong>. Di versi nyata, di sini dapat berupa video, PDF, atau teks panjang. Untuk demo ini, silakan klik "Sudah Membaca" setelah kamu selesai membaca materi.</p>
    <ol>
      <li>Penjelasan singkat 1</li>
      <li>Contoh penerapan 2</li>
      <li>Latihan singkat: coba jelaskan kembali konsep inti pada kertas</li>
    </ol>
  `;

  const readBtn = document.getElementById('readBtn');
  const doneBtn = document.getElementById('doneBtn');
  readBtn.disabled = false;
  doneBtn.disabled = true;

  readBtn.onclick = ()=>{
    readBtn.innerText = "Mempersiapkan tombol selesai...";
    // simulate a small study time (3s) before enabling Done
    setTimeout(()=>{
      readBtn.innerText = "Sudah Membaca ✓";
      doneBtn.disabled = false;
      showToast("Sekarang tombol 'Tandai Selesai' aktif.", 1000);
    }, 1200);
  };

  doneBtn.onclick = ()=>{
    // mark material as done for active student
    const activeId = localStorage.getItem("educore_active_student");
    const students = getStore(KEY_STUDENTS);
    const s = students.find(x=>x.id===activeId);
    if(!s){ alert("Sesi tidak ditemukan."); location.href="mahasiswa-register.html"; return; }
    if(!s.enrollments[courseId]){ alert("Kamu belum terdaftar di kursus ini."); location.href="mahasiswa-matkul.html"; return; }
    s.enrollments[courseId].materials[idx] = true;
    setStore(KEY_STUDENTS, students);
    showToast("Materi ditandai selesai ✅", 1000);
    setTimeout(()=> location.href = "mahasiswa-kelas.html", 900);
  };
}

/* Page: mahasiswa-kuis.html */
function renderQuizPage(){
  const activeId = localStorage.getItem("educore_active_student");
  if(!activeId) { location.href="mahasiswa-register.html"; return; }

  const courseId = localStorage.getItem("educore_active_course") || sessionStorage.getItem("educore_materi_course");
  if(!courseId){ alert("Tidak ada kursus aktif."); location.href="mahasiswa-matkul.html"; return; }

  const quizData = getStore(KEY_QUIZZES).find(q=>q.courseId===courseId);
  const wrap = document.getElementById('quizWrap');
  const resultWrap = document.getElementById('resultWrap');
  document.getElementById('courseLabel').innerText = findCourseById(courseId).title;

  if(!quizData){
    wrap.innerHTML = `<p>Tidak ada kuis tersedia untuk kursus ini.</p>`;
    return;
  }

  // build quiz form
  let html = `<form id="quizForm">`;
  quizData.questions.forEach((q, i)=>{
    html += `<div class="qcard"><p><strong>Soal ${i+1}.</strong> ${q.q}</p>`;
    q.options.forEach((opt, j)=>{
      html += `<label style="display:block;margin:6px 0;"><input type="radio" name="q${i}" value="${j}"> ${opt}</label>`;
    });
    html += `</div><hr/>`;
  });
  html += `<div style="text-align:center"><button type="submit" class="cta">Submit Jawaban</button></div></form>`;
  wrap.innerHTML = html;

  document.getElementById('quizForm').onsubmit = (ev)=>{
    ev.preventDefault();
    const formData = new FormData(ev.target);
    let correct = 0;
    quizData.questions.forEach((q, i)=>{
      const ans = formData.get('q'+i);
      if(ans !== null && Number(ans) === q.answer) correct++;
    });
    const score = Math.round((correct / quizData.questions.length) * 100);

    // save to student enrollment
    const students = getStore(KEY_STUDENTS);
    const sidx = students.findIndex(s=>s.id===activeId);
    if(sidx !== -1 && students[sidx].enrollments[courseId]){
      students[sidx].enrollments[courseId].quiz = { score, date: Date.now() };
      setStore(KEY_STUDENTS, students);
    }

    // show result and recommendation
    wrap.classList.add('hidden');
    resultWrap.classList.remove('hidden');
    let rec = "";
    if(score < 60) rec = "Nilai < 60 — direkomendasikan mengulang materi 2 & 3, atau menonton video remedial.";
    else rec = "Bagus! Nilai memadai — lanjut ke materi lanjutan atau praktik.";
    resultWrap.innerHTML = `
      <h3>Hasil Kuis</h3>
      <p>Skor kamu: <strong>${score}</strong></p>
      <p>${rec}</p>
      <div style="text-align:center;margin-top:12px;">
        <a class="linkish" href="mahasiswa-kelas.html">Kembali ke Kelas</a>
      </div>
    `;
  };
}

/* ------------------ DOSEN FLOW ------------------ */
function renderDosenLogin(){
  // populate course select
  const sel = document.getElementById('d_course');
  if(!sel) return;
  sel.innerHTML = "";
  const courses = getStore(KEY_COURSES);
  courses.forEach(c=>{
    const opt = document.createElement('option');
    opt.value = c.id; opt.innerText = c.title;
    sel.appendChild(opt);
  });
}
function loginDosen(){
  const name = document.getElementById('d_name').value?.trim();
  const courseId = document.getElementById('d_course').value;
  if(!name || !courseId){ alert("Isi nama & pilih matkul."); return; }
  const teachers = getStore(KEY_TEACHERS);
  const tid = "t-" + Date.now();
  teachers.push({ id: tid, name, matkul: courseId });
  setStore(KEY_TEACHERS, teachers);
  // store session
  localStorage.setItem("educore_active_teacher", tid);
  location.href = "dosen-dashboard.html";
}
function renderDosenDashboard(){
  const tid = localStorage.getItem("educore_active_teacher");
  if(!tid) { location.href="dosen-login.html"; return; }
  const teachers = getStore(KEY_TEACHERS);
  const teacher = teachers.find(t => t.id === tid);
  const course = findCourseById(teacher.matkul);

  document.getElementById('dName').innerText = teacher.name;
  document.getElementById('dCourse').innerText = course.title;

  // find students enrolled in this course
  const students = getStore(KEY_STUDENTS);
  const enrolled = students.filter(s => s.enrollments && s.enrollments[course.id]);

  document.getElementById('countStudents').innerText = enrolled.length;
  const wrap = document.getElementById('studentsWrap');
  wrap.innerHTML = "";
  if(enrolled.length === 0) wrap.innerHTML = "<p>Belum ada mahasiswa terdaftar di kursus ini.</p>";
  else {
    enrolled.forEach(s=>{
      const enroll = s.enrollments[course.id];
      const doneCount = enroll.materials.filter(Boolean).length;
      const total = enroll.materials.length;
      const pct = Math.round((doneCount/total)*100);
      const score = enroll.quiz ? enroll.quiz.score : "Belum Ujian";
      const status = (enroll.quiz && enroll.quiz.score < 60) ? 'Perlu Remedial' : (enroll.quiz ? 'Lulus' : 'Belum Ujian');

      const row = document.createElement('div');
      row.className = 'student-row';
      row.innerHTML = `
        <div class="student-left">
          <div>
            <div class="student-name">${s.name}</div>
            <div class="student-meta">${s.email} • ${s.jurusan}</div>
          </div>
        </div>
        <div style="text-align:right">
          <div>Progress: <strong>${pct}%</strong></div>
          <div>Skor Kuis: <strong>${score}</strong></div>
          <div style="margin-top:8px"><span class="small-badge">${status}</span></div>
        </div>
      `;
      wrap.appendChild(row);
    });
  }
}

/* ------------------ page detection & init ------------------ */
document.addEventListener('DOMContentLoaded', function(){
  const path = location.pathname.split("/").pop();

  // expose reset/seed for index page buttons
  window.resetDemo = resetDemo;
  window.seedAgain = seedAgain;

  // Student register page
  if(path === "mahasiswa-register.html"){
    // nothing else
  }

  // mahasiswa-matkul
  if(path === "mahasiswa-matkul.html"){
    renderCoursesPage();
  }

  // mahasiswa-kelas
  if(path === "mahasiswa-kelas.html"){
    renderKelasPage();
  }

  // materi
  if(path === "materi.html"){
    renderMateriPage();
  }

  // kuis page
  if(path === "mahasiswa-kuis.html"){
    renderQuizPage();
  }

  // dosen login
  if(path === "dosen-login.html"){
    renderDosenLogin();
  }

  // dosen dashboard
  if(path === "dosen-dashboard.html"){
    renderDosenDashboard();
  }

  /* expose functions used from HTML */
  window.registerStudent = registerStudent;
  window.handleCourseClick = handleCourseClick;
  window.openMateri = openMateri;
  window.goToQuiz = function(){ location.href = "mahasiswa-kuis.html"; }
  window.loginDosen = loginDosen;
});
