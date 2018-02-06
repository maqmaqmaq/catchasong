	<?php

	session_start();

	if ($_SERVER['REQUEST_METHOD'] === 'POST')
	{
		if ( $_POST['answer'] == ($_SESSION['artistName'].' - '.$_SESSION['trackName']) )
		{
			echo "Zgadłeś!!";
		}
		else
		{
			echo "Nie zgadłeś!!";
		}

	}

	$response = file_get_contents('https://itunes.apple.com/search?country=PL&media=music&term=my&entity=song&genre=1205');

	$response = json_decode($response);

	echo 'Wynikow : '.count($response->results)."<br>";

	$randomNumber = rand(1, 50);

	$res = $response->results[$randomNumber];

	$_SESSION['artistName'] = strtolower($res->artistName);
	$_SESSION['trackName'] = strtolower($res->trackName);

	echo '<audio src="'.$res->previewUrl.'" controls></audio>'.strtolower($res->artistName).' - '.strtolower($res->trackName).'<br>';

	?>

	<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" accept-charset="utf-8">
			<input type="text" name="answer">
			<input type="submit" value="Send">
	</form>