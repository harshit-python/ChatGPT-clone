async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}


sendButton1.addEventListener("click", async()=> {
    questionInput1 = document.getElementById("questionInput1").value;
    document.getElementById("questionInput1").value = "";
    document.querySelector(".right2").style.display = "block";
    document.querySelector(".right1").style.display = "none";

    // fill question in question section
    question1 = document.getElementById("question1");
    question1.innerHTML = questionInput1;
    question2 = document.getElementById("question2");
    question2.innerHTML = questionInput1;

    solution = document.getElementById("solution");

    // get the answer and populate it
    let result = await postData("/api", {"question": questionInput1})
    solution.innerHTML = result.answer;
    
})

sendButton2.addEventListener("click", async()=> {
    questionInput2 = document.getElementById("questionInput2").value;
    document.getElementById("questionInput2").value = "";
    document.querySelector(".right2").style.display = "block"
    document.querySelector(".right1").style.display = "none"

    // fill question in question section
    question1 = document.getElementById("question1");
    question1.innerHTML = questionInput2;
    question2 = document.getElementById("question2");
    question2.innerHTML = questionInput2;

    // get the answer and populate it
    let result = await postData("/api", {"question": questionInput2})
    solution.innerHTML = result.answer;
})