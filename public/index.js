$('#form').submit(function(event) {
  event.preventDefault();

  $("#form :input").prop("disabled", true);

	$.ajax({
		url: '/api/submit-article',
		data: JSON.stringify({ url: $('#url').val() }),
		type: 'POST',
		contentType: 'application/json',
		success: function(data) {
			$("#form :input").prop("disabled", false);
      $('#url').val('');
		}
	});
});
