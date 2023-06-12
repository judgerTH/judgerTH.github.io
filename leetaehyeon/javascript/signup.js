btn1.onclick = () => {
  loadUser();
};

const loadUser = () => {
  const tbody = document.querySelector("table#tbl-user tbody");
  const users = JSON.parse(localStorage.getItem('users'));

  // guestbook -> tr -> tbody
  tbody.innerHTML = users.reduce((html, { userId, userPw, userName, year, month, day, phoneNum, createdAt }, index) => {
    const tr = `
      <tr>
        <td>${index + 1}</td>
        <td>${userId}</td>
        <td>${userPw}</td>
        <td>${userName}</td>
        <td>${year}</td>
        <td>${month}</td>
        <td>${day}</td>
        <td>${phoneNum}</td>
        <td>${formatDatetime(createdAt)}</td>
      </tr>
      `;
    return html + tr;
  }, "");

};

const formatDatetime = (millis) => {
  const d = new Date(millis);
  const f = (n) => n.toString().padStart(2, "0");
  const yy = d.getFullYear().toString().substring(2);
  const MM = f(d.getMonth() + 1);
  const dd = f(d.getDate());
  const hh = f(d.getHours());
  const mm = f(d.getMinutes());
  return `${yy}/${MM}/${dd} ${hh}:${mm}`;
}

const saveUser = () => {


  const frm = document.memberFrm;
  const userId = frm.userId;
  const userPw = frm.userPw;
  const userName = frm.userName;
  const year = frm.year;
  const month = frm.month;
  const day = frm.day;
  const phoneNum = frm.phoneNum;

  const user = new User(userId.value, userPw.value, userName.value, year.value, month.value, day.value, phoneNum.value);
  console.log(user);

  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  const jsonStr = JSON.stringify(users);
  localStorage.setItem("users", jsonStr);

  // 초기화 
  userId.value = '';
  userPw.value = '';
  userName.value = '';
  year.value = '';
  month.value = '';
  day.value = '';
  phoneNum.value = '';

  loadUser();
};

class User {
  constructor(userId, userPw, userName, year, month, day, phoneNum, createdAt = Date.now()) {
    this.userId = userId;
    this.userPw = userPw;
    this.userName = userName;
    this.year = year;
    this.month = month;
    this.day = day;
    this.phoneNum = phoneNum;
    this.createdAt = createdAt;
  }
}


document.memberFrm.onsubmit = (e) => {
  const frm = e.target;
  const inputId = frm.userId;
  const inputPw = frm.userPw;
  const inputPwconfirm = frm.userPwconfirm;
  const name = frm.userName;

  console.log(frm);
  // 아이디 4-12자리
  if (!/^.{4,12}$/.test(inputId.value)) {
    alert('아이디의 길이는 4 ~ 12자리여야 합니다.');
    e.preventDefault();
    return;
  }

  // 비밀번호 ?!@#$%를 포함하는 8-12자리
  if (!/[?!@#$%]/.test(inputPw.value)) {
    alert('비밀번호는 특수문자 !&/\\*@ 를 하나이상 포함해야합니다.');
    e.preventDefault();
    return;
  }
  if (!/^.{8,12}$/.test(inputPw.value)) {
    alert('비밀번호는 8~12자리여야 합니다.');
    e.preventDefault();
    return;
  }

  // 이름 한글2글자 이상
  if (!/^[가-힣]{2,}$/.test(name.value)) {
    alert('이름은 한글 2글자 이상이여야 합니다.');
    e.preventDefault();
    return;
  }

  alert('회원가입 성공!');

}
