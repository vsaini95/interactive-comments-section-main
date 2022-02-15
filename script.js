const wrapper = document.querySelector(".wrapper");
const SendNewBtn = document.querySelector(".SendNewBtn");

let user;

function commentFunc(elem) {
  return `<div class="section">
                  <div class="vote">
                    <img class="plus" src="images/icon-plus.svg" alt="" />
                    <div class="score">${elem.score}</div>
                    <img class="minus" src="images/icon-minus.svg" alt="" />
                 </div>
                 <div class="content">
                    <div class="top">
                     <div class="identity">
                        <img src="${elem.user.image.png}" alt="">
                        <p class="name">${elem.user.username}</p>
                        <p class="time">${elem.createdAt}</p>
                      </div>
                     <div class="replyBtn">
                       <img src="images/icon-reply.svg" alt="">
                       <p>Reply</p>
                      </div>
                   </div>
                   <div class="msg">
                     <p>${elem.content}</p>
                   </div>
                 </div>
                </div>`;
}

function ReplyFunc(elem) {
  return `<div class="section">
        <div class="vote">
          <img class="plus" src="images/icon-plus.svg" alt="">
          <div class="score">${elem.score}</div>
          <img class="minus" src="images/icon-minus.svg" alt="">
        </div>
        <div class="content">
          <div class="top">
            <div class="identity">
              <img src="images/avatars/image-juliusomo.png" alt="">
              <p class="name">juliusomo</p>
              <p class="You">You</p>
              <p class="time">${elem.createdAt}</p>
            </div>
  
            <div class="deleteBtn">
              <img src="images/icon-delete.svg" alt="" class="deleteRply" id="delete">
              <p class="delete">Delete</p>
              <img src="images/icon-edit.svg" class="editRply" alt="">
              <p class="edit">Edit</p>
            </div>
          </div>
          <div class="msg">
            <p><span>@${elem.replyingTo}</span> ${elem.content}</p>
          </div>
        </div>
      </div>`;
}
/* ----------Reply----------*/
function ReplyFun(elem) {
  return `<div class="section">
  <div class="vote">
    <img class="plus" src="images/icon-plus.svg" alt="" />
    <div class="score">${elem.score}</div>
    <img class="minus" src="images/icon-minus.svg" alt="" />
 </div>
 <div class="content">
    <div class="top">
     <div class="identity">
        <img src="${elem.user.image.png}" alt="">
        <p class="name">${elem.user.username}</p>
        <p class="time">${elem.createdAt}</p>
      </div>
     <div class="replyBtn">
       <img src="images/icon-reply.svg" alt="">
       <p>Reply</p>
      </div>
   </div>
   <div class="msg">
     <p><span>@${elem.replyingTo}</span> ${elem.content}</p>
   </div>
 </div>
</div>`;
}

function ReplyFuncs(elem) {
  return `<div class="section">
        <div class="vote">
          <img class="plus" src="images/icon-plus.svg" alt="">
          <div class="score">${elem.score}</div>
          <img class="minus" src="images/icon-minus.svg" alt="">
        </div>
        <div class="content">
          <div class="top">
            <div class="identity">
              <img src="images/avatars/image-juliusomo.png" alt="">
              <p class="name">juliusomo</p>
              <p class="You">You</p>
              <p class="time">${elem.createdAt}</p>
            </div>
            <div class="replyBtn">
              <img src="images/icon-delete.svg" alt="" class="deleteRply" id="delete">
              <p class="delete">Delete</p>
              <img src="images/icon-edit.svg" class="editRply" alt="">
              <p class="edit">Edit</p>
            </div>
          </div>
          <div class="msg" contenteditable="false">
            <p>${elem.content}</p>
          </div>
        </div>
      </div>`;
}

function replyDiv() {
  {
    return `<div class="Comment">
  <img src="images/avatars/image-juliusomo.png" alt="">
  <textarea placeholder="Comment Please!!" class="textArea"></textarea>
  <button class="SendNewBtn">Send</button>
</div>`;
  }
}

/*--------------------Voting-----------------------------------------------*/
function vote(e) {
  if (e.target.classList.contains("plus")) {
    e.target.nextElementSibling.textContent++;
  }
  if (
    e.target.classList.contains("minus") &&
    e.target.previousElementSibling.textContent > 0
  ) {
    e.target.previousElementSibling.textContent--;
  }
}
/*--------------------btn--------------------------------------*/
function updateBtn() {
  return `  
  <div class="update">
    <button class="updateBtn">Update</button>
  </div>
`;
}
/*--------------------Update------------------------*/
function edit(e) {
  let editPara = e.target.parentNode.parentNode.parentNode.childNodes[3];
  let Para =
    e.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1];

  if (e.target.classList.contains("editRply")) {
    //console.log(Para.childNodes[0]);
    const editDiv = document.createElement("div");
    editDiv.innerHTML = updateBtn();
    const node = e.target.parentNode.parentNode.parentNode;
    //console.log(node);
    node.appendChild(editDiv);
    editPara.classList.add("editing");
    editPara.setAttribute("contenteditable", "true");
    editDiv.addEventListener("click", function (e) {
      const div = document.createElement("div");
      div.innerHTML = Para.textContent;
      editPara.replaceChild(div, Para);
      editPara.setAttribute("contenteditable", "false");
      editPara.classList.remove("editing");

      editDiv.remove();
    });
  }
}

function getData() {
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      user = data;
      //console.log(data);
      const comment = user.comments;
      //console.log(comment);
      comment.forEach((elem) => {
        //console.log(elem);
        const commentBox = document.createElement("div");
        commentBox.innerHTML = commentFunc(elem);
        wrapper.appendChild(commentBox);
        commentBox.addEventListener("click", function (e) {
          vote(e);
        });

        /*-------Replies----------------------------------------------------*/

        const replies = document.createElement("div");
        replies.classList.add("sideDiv");

        elem.replies.forEach((item) => {
          const Replied = document.createElement("div");
          Replied.setAttribute("class", "Reply");
          if (item.user.username == "juliusomo") {
            Replied.innerHTML = ReplyFunc(item);
          } else {
            Replied.innerHTML = ReplyFun(item);
          }
          replies.appendChild(Replied);
          Replied.addEventListener("click", function (e) {
            if (e.target.classList.contains("deleteRply")) {
              toggleModal(e);
            } else {
              vote(e);
            }
            if (e.target.classList.contains("editRply")) {
              edit(e);
            }
          });

          /*------------reply functionality-----------------------------------------------*/
          Replied.addEventListener("click", function (e) {
            const username =
              e.currentTarget.childNodes[0].childNodes[3].childNodes[1]
                .childNodes[1].childNodes[3].textContent;
            const replyBox = document.createElement("div");

            if (e.target.parentNode.classList.contains("replyBtn")) {
              replyBox.innerHTML = replyDiv(e);
            }
            e.target.parentNode.parentNode.parentNode.parentNode.after(
              replyBox
            );
            replyBox.addEventListener("click", function (e) {
              if (e.target.classList.contains("SendNewBtn")) {
                let msg = e.target.parentNode.childNodes[3].value;
                let obj = {
                  content: `${msg}`,
                  createdAt: "1 min ago",
                  score: 0,
                  replyingTo: `${username}`,
                  user: {
                    image: {
                      png: "./images/avatars/image-juliusomo.png",
                      webp: "./images/avatars/image-juliusomo.webp",
                    },
                    username: "juliusomo",
                  },
                  replies: [],
                };
                console.log(obj);
                const newReplyBox = document.createElement("div");
                if (msg) {
                  newReplyBox.setAttribute("class", "Reply");
                  newReplyBox.innerHTML = ReplyFunc(obj);

                  replies.appendChild(newReplyBox);
                  replyBox.classList.add("hidden");
                  newReplyBox.addEventListener("click", function (e) {
                    if (e.target.classList.contains("deleteRply")) {
                      toggleModal(e);
                    } else {
                      vote(e);
                    }
                    if (e.target.classList.contains("editRply")) {
                      edit(e);
                    }
                  });
                }
              }
            });
          });
        });
        commentBox.after(replies);
        const repliey = document.createElement("div");
        repliey.classList.add("sideDiv");

        commentBox.addEventListener("click", function (e) {
          const username =
            e.currentTarget.childNodes[0].childNodes[3].childNodes[1]
              .childNodes[1].childNodes[3].textContent;
          //console.log(username);
          const replyBox = document.createElement("div");
          if (e.target.parentNode.classList.contains("replyBtn")) {
            replyBox.innerHTML = replyDiv(e);
          }
          commentBox.appendChild(replyBox);
          replyBox.addEventListener("click", function (e) {
            if (e.target.classList.contains("SendNewBtn")) {
              let msg = e.target.parentNode.childNodes[3].value;
              let obj = {
                content: `${msg}`,
                createdAt: "1 min ago",
                score: 0,
                replyingTo: `${username}`,
                user: {
                  image: {
                    png: "./images/avatars/image-juliusomo.png",
                    webp: "./images/avatars/image-juliusomo.webp",
                  },
                  username: "juliusomo",
                },
                replies: [],
              };
              const newReplyBox = document.createElement("div");
              if (msg) {
                newReplyBox.innerHTML = ReplyFunc(obj);
                repliey.appendChild(newReplyBox);
                if (username == "maxblagun") {
                  repliey.classList.remove("sideDiv");
                  repliey.setAttribute("class", "Replycontent");
                  replies.appendChild(repliey);
                } else {
                  newReplyBox.setAttribute("class", "Replycontent");
                  commentBox.appendChild(repliey);
                }
                replyBox.classList.add("hidden");
              }
              repliey.addEventListener("click", function (e) {
                if (e.target.classList.contains("deleteRply")) {
                  toggleModal(e);
                } else {
                  vote(e);
                }
                if (e.target.classList.contains("editRply")) {
                  edit(e);
                }
              });
            }
          });
        });
      });

      /*------------add new comment---------------------------------------------------*/
      let newComment = document.querySelector(".SendNewBtn");
      newComment.addEventListener("click", function (e) {
        let msg = e.target.parentNode.childNodes[3].value;
        let obj = {
          content: `${msg}`,
          createdAt: "1 min ago",
          score: 0,
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
          replies: [],
        };
        const NewCommentBox = document.createElement("div");
        if (msg) {
          NewCommentBox.innerHTML = ReplyFuncs(obj);
        }
        wrapper.appendChild(NewCommentBox);
        NewCommentBox.addEventListener("click", function (e) {
          if (e.target.classList.contains("deleteRply")) {
            toggleModal(e);
          } else {
            vote(e);
          }
          if (e.target.classList.contains("editRply")) {
            edit(e);
          }
        });
      });
    });
}
window.addEventListener("load", getData);

/* -------------Delete------------------- */
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
function toggleModal(e) {
  modal.classList.toggle("show-modal");
  const div = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
  modal.addEventListener("click", function (e) {
    if (e.target.classList.contains("yes")) {
      modal.classList.remove("show-modal");
      div.remove();
    }
    if (e.target.classList.contains("no")) {
      modal.classList.remove("show-modal");
    }
  });
}
