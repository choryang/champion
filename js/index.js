$(function () {
  var champion = [];
  $.getJSON(
    "https://choryang.github.io/champion/data/champion.json",
    function (data) {
      data.map((item) => {
        champion.push(item);
      });
      champion.map((champion) => {
        return $(".champion").append(
          `<p id=${champion.name}><span class="champion-name">${champion.name}</span><img class="champion-img" src=${champion.image} alt="profile"/><p>`
        );
      });
      $(".champion p").on("click", function () {
        var name = $(this).attr("id");
        var result = champion.filter((champion) => champion.name === name);
        $("#champion-info").attr("name", name);
        $("#champion-info").html(result[0].info);
      });
    }
  );

  $("#summernote").summernote({
    height: 360, // 에디터 높이
    minHeight: null, // 최소 높이
    maxHeight: null, // 최대 높이
    focus: true, // 에디터 로딩후 포커스를 맞출지 여부
    lang: "ko-KR", // 한글 설정
  });

  $("#search").keyup(function () {
    $(".champion").empty();
    var keyword = $("#search").val();
    var result = champion.filter((champion) => champion.name.includes(keyword));
    result.map((champion) => {
      return $(".champion").append(
        `<p id=${champion.name}><span class="champion-name">${champion.name}</span><img class="champion-img" src=${champion.image} alt="profile"/><p>`
      );
    });
    $(".champion p").on("click", function () {
      var name = $(this).attr("id");
      var result = champion.filter((champion) => champion.name === name);
      $("#champion-info").html(result[0].info);
    });
  });

  $(".edit").click(function () {
    $("#champion-info").css("display", "none");
    $("#champion-info-edit").css("display", "block");
    $("#summernote").summernote("code", $("#champion-info").html());
  });

  $(".save").click(function () {
    var name = $("#champion-info").attr("name");
    var result = champion.filter((champion) => champion.name === name);
    var idx = result[0].id - 1;
    var edited = $("#summernote").summernote("code");
    var newInfo = {
      id: result[0].id,
      name: result[0].name,
      engName: result[0].engName,
      type: result[0].type,
      info: edited,
      image: result[0].image,
    };
    champion.splice(idx, 1, newInfo);
    $("#champion-info").html(edited);
    $("#champion-info").css("display", "block");
    $("#champion-info-edit").css("display", "none");
  });
});
