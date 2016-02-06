$('#fornavn').focus();

$('#proev-igen').on('click', function(e) {
	$('#formular').removeClass('hidden');
	$('#arbejder').addClass('hidden');
	$('#fejl').addClass('hidden');
	$('#fejl-besked').text();
});

$('#formular').submit(function(e) {
	$('#formular').addClass('hidden');
	$('#arbejder').removeClass('hidden');

	e.preventDefault();

	var fornavn = $('#fornavn').val();
	var efternavn = $('#efternavn').val();
	var email = $('#email').val();

	$.ajax({
	    type: 'POST',
	    url: '/api/underskriftindsamling/underskriv',
	    data: JSON.stringify({
				fornavn: fornavn,
				efternavn: efternavn,
				email: email
			}),
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	})
	.fail(function(response) {
		$('#arbejder').addClass('hidden');
		$('#fejl').removeClass('hidden');
		$('#fejl-besked').text(response.responseText);
	})
	.done(function(data) {
		$('#arbejder').addClass('hidden');
		$('#tak').removeClass('hidden');
	});
});
