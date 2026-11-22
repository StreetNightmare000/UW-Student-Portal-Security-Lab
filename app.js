// UW Student Portal - Security Remediated Version

const USERS = [
  {
    id: 1001,
    name: "Ayesha Khan",
    email: "ayesha@uw.test"
  },
  {
    id: 1002,
    name: "Bilal Ahmed",
    email: "bilal@uw.test"
  },
  {
    id: 2001,
    name: "Dr. Sana Malik",
    email: "sana@uw.test"
  },
  {
    id: 9001,
    name: "Admin",
    email: "admin@uw.test"
  }
];

const RESULTS = {
  1001: { course: "CYS-331L", marks: 88 },
  1002: { course: "CYS-331L", marks: 54 },
  2001: { course: "n/a", marks: 0 }
};

const COURSES = [
  "CYS-331L Secure Software Design",
  "CS-101 Programming",
  "MT-210 Discrete Maths"
];

const $ = (id) => document.getElementById(id);

let currentUser = null;

function showLoginMessage(message) {
  $("loginMsg").textContent = message;
}

$("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = $("email").value.trim();

  const user = USERS.find((u) => u.email === email);

  if (!user) {
    showLoginMessage("Invalid account.");
    return;
  }

  currentUser = {
    id: user.id,
    name: user.name
  };

  render();
});

$("resultForm").addEventListener("submit", (e) => {
  e.preventDefault();

  if (!currentUser) {
    $("resultOut").textContent = "Please sign in.";
    return;
  }

  const result = RESULTS[currentUser.id];

  if (!result) {
    $("resultOut").textContent = "No result found.";
    return;
  }

  $("resultOut").textContent =
    `${currentUser.name}: ${result.course} = ${result.marks}`;
});

$("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const query = $("q").value.trim().toLowerCase();

  const hits = COURSES.filter((course) =>
    course.toLowerCase().includes(query)
  );

  $("searchOut").textContent =
    hits.length > 0
      ? hits.join(", ")
      : "No matching courses found.";
});

$("logout").addEventListener("click", () => {
  currentUser = null;

  $("resultOut").textContent = "";
  $("searchOut").textContent = "";

  render();
});

function render() {
  const loggedIn = currentUser !== null;

  $("loginBox").classList.toggle("hidden", loggedIn);
  $("dash").classList.toggle("hidden", !loggedIn);

  if (!loggedIn) {
    return;
  }

  $("welcome").textContent =
    "Welcome, " + currentUser.name;

  $("admin").classList.add("hidden");

  if ($("userList")) {
    $("userList").textContent = "";
  }
}

render();
