$(function() {

  var search_list = $('#user-search-result');
  var chat_users = $('#chat-group-users');

  function appendUser(user) {
    var html = `<ul class='user-search-index'>
                  <li>
                    <div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${user.name}</p>
                      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                    </div>
                  </li>
                </ul>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<ul class='user-search-index'>
                  <li>
                    <div class="chat-group-user clearfix">${msg}</div>
                  </li>
                </ul>`
    search_list.append(html);
  }

  function addChatUser(id, name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    chat_users.append(html);
  }

  $('#user-search-field').on("keyup", function (){
    var input = $('#user-search-field').val();
 
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $('.user-search-index').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーがいません")
      }
    })
    
    .fail(function() {
      alert("ユーザ検索に失敗しました。");
    })
  });

  $('#user-search-result').on('click', '.user-search-add', function(e) {
    e.stopPropagation();
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    addChatUser(id, name);
    $(this).parent().remove();
  });

  $('#chat-group-users').on('click', '.js-remove-btn', function(e) {
    e.stopPropagation();
    $(this).parent().remove();
  });

});
