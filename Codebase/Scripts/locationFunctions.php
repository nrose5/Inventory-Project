<?php

    header('Content-Type: application/json');

    $aResult = array();

    if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

    if( !isset($aResult['error']) ) {

        switch ($_POST['functionname']) {
            case 'swap':
                if ( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                    $aResult['error'] = 'Error in arguments!';
                } else {
                    $path = $_SERVER['DOCUMENT_ROOT'].'/Data/Main.json';
                    clearstatcache();
                    if (file_exists($path)) {
                        $aResult['result'] = "Swapping: ".$_POST['arguments'][0]." and ".$_POST['arguments'][1];
                        // Get JSON
                        $jsonString = file_get_contents($path);
                        $data = json_decode($jsonString, true);

                        // Swap order
                        for ($i=0; $i < count($data['locations']); $i++) {
                            if ($data['locations'][$i]['order'] == $_POST['arguments'][0]) {
                                $data['locations'][$i]['order'] = floatval($_POST['arguments'][1]);
                            } elseif ($data['locations'][$i]['order'] == $_POST['arguments'][1]) {
                                $data['locations'][$i]['order'] = floatval($_POST['arguments'][0]);
                            }
                        }

                        // Update JSON
                        $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
                        file_put_contents($path, $newJsonString);
                    } else {
                        $aResult['error'] = 'File Not Found';
                    }
               }
               break;

            default:
               $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
               break;
        }

    }

    echo json_encode($aResult);
?>