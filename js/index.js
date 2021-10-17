$(function () {
  function printInfo() {
    $(".champion p").on("click", function () {
      var name = $(this).attr("id");
      var result = champion.filter((champion) => champion.name === name);
      $("#champion-info").html(result[0].info);
    });
  }
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

  $("#search").keyup(function () {
    $(".champion").empty();
    var keyword = $("#search").val();
    var result = champion.filter((champion) => champion.name.includes(keyword));
    result.map((champion) => {
      return $(".champion").append(
        `<p id=${champion.name}><span class="champion-name">${champion.name}</span><img class="champion-img" src=${champion.image} alt="profile"/><p>`
      );
    });
    printInfo();
  });

  $(".type img").click(function () {
    $(".champion").empty();
    var type = $(this).attr("id");
    if ($(this).data("click") === false) {
      $(this).data("click", true);
      var result = champion.filter((champion) => champion.type.includes(type));
      result.map((champion) => {
        return $(".champion").append(
          `<p id=${champion.name}><span class="champion-name">${champion.name}</span><img class="champion-img" src=${champion.image} alt="profile"/><p>`
        );
      });
    } else if ($(this).data("click") === true) {
      $(this).data("click", false);
      champion.map((champion) => {
        return $(".champion").append(
          `<p id=${champion.name}><span class="champion-name">${champion.name}</span><img class="champion-img" src=${champion.image} alt="profile"/><p>`
        );
      });
    }
    printInfo();
  });
});
