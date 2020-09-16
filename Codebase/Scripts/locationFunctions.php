<?php

    header('Content-Type: application/json');

    $aResult = array();

    if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

    if( !isset($aResult['error']) ) {

        switch ($_POST['functionname']) {
            case 'swap':
                $_POST['arguments'][0] = floatval($_POST['arguments'][0]);
                $_POST['arguments'][1] = floatval($_POST['arguments'][1]);
                // Arguments: order 1, order 2
                $path = $_SERVER['DOCUMENT_ROOT'].'/Data/Main.json';
                clearstatcache();
                if (file_exists($path)) {
                    $aResult['result'] = "Swapping: ".$_POST['arguments'][0]." and ".$_POST['arguments'][1];
                    // Get JSON
                    $jsonString = file_get_contents($path);
                    $data = json_decode($jsonString, true);

                    $name = '';
                    // Change order
                    if ($_POST['arguments'][0] > $_POST['arguments'][1]) {
                        for ($i=0; $i < count($data['locations']); $i++) {
                            if ($_POST['arguments'][0] == $data['locations'][$i]['order']) {
                                $name = $data['locations'][$i]['name'];
                                $data['locations'][$i]['order'] = $_POST['arguments'][1];
                            }
                        }
                        for ($i=0; $i < count($data['locations']); $i++) { 
                            if ($name != $data['locations'][$i]['name'] && $data['locations'][$i]['order'] < $_POST['arguments'][0] && $data['locations'][$i]['order'] >= $_POST['arguments'][1]) {
                                $data['locations'][$i]['order']++;
                            }
                        }
                    } elseif ($_POST['arguments'][0] < $_POST['arguments'][1]) {
                        for ($i=0; $i < count($data['locations']); $i++) {
                            if ($_POST['arguments'][0] == $data['locations'][$i]['order']) {
                                $name = $data['locations'][$i]['name'];
                                $data['locations'][$i]['order'] = $_POST['arguments'][1];
                            }
                        }
                        for ($i=0; $i < count($data['locations']); $i++) { 
                            if ($name != $data['locations'][$i]['name'] && $data['locations'][$i]['order'] > $_POST['arguments'][0] && $data['locations'][$i]['order'] <= $_POST['arguments'][1]) {
                                $data['locations'][$i]['order']--;
                            }
                        }
                    }

                    // Update JSON
                    $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
                    file_put_contents($path, $newJsonString);
                } else {
                    $aResult['error'] = 'File Not Found';
                }
                break;

            case 'delete':
                // Arguments: order
                $path = $_SERVER['DOCUMENT_ROOT'].'/Data/Main.json';
                clearstatcache();
                if (file_exists($path)) {
                    // Get JSON
                    $jsonString = file_get_contents($path);
                    $data = json_decode($jsonString, true);

                    $dataCopy = array();
                    $j = 0;

                    // Change name
                    for ($i=0; $i < count($data['locations']); $i++) {
                        if ($data['locations'][$i]['order'] != floatval($_POST['arguments'][0])) {
                            if ($data['locations'][$i]['order'] > floatval($_POST['arguments'][0])) {
                                $data['locations'][$i]['order']--;
                            }
                            $dataCopy[$j] = $data['locations'][$i];
                            $j++;
                        }
                    }

                    $data['locations'] = $dataCopy;

                    // Update JSON
                    $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
                    file_put_contents($path, $newJsonString);
                    $aResult['result'] = 'Deleting item in order: '.$_POST['arguments'][0];
                } else {
                    $aResult['error'] = 'File not found';
                }
                break;

            case 'edit':
                // Arguments: order, name
                $path = $_SERVER['DOCUMENT_ROOT'].'/Data/Main.json';
                clearstatcache();
                if (file_exists($path)) {
                    // Get JSON
                    $jsonString = file_get_contents($path);
                    $data = json_decode($jsonString, true);

                    // Change name
                    for ($i=0; $i < count($data['locations']); $i++) {
                        if ($data['locations'][$i]['order'] == floatval($_POST['arguments'][0])) {
                            $data['locations'][$i]['name'] = $_POST['arguments'][1];
                        }
                    }

                    // Update JSON
                    $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
                    file_put_contents($path, $newJsonString);
                    $aResult['result'] = 'Name changed to: '.$_POST['arguments'][1].' at order: '.$_POST['arguments'][0];
                } else {
                    $aResult['error'] = 'File not found';
                }
                break;

            case 'new':
                // Arguments: order, name
                $aResult['result'] = 'New entry: '.$_POST['arguments'][1]." at order: ".$_POST['arguments'][0];
                $path = $_SERVER['DOCUMENT_ROOT'].'/Data/Main.json';
                clearstatcache();
                if (file_exists($path)) {
                    // Get JSON
                    $jsonString = file_get_contents($path);
                    $data = json_decode($jsonString, true);

                    // Update name and order
                    $data['locations'][count($data['locations'])]['name'] = $_POST['arguments'][1];
                    $data['locations'][count($data['locations'])-1]['order'] = floatval($_POST['arguments'][0]);

                    // Update JSON
                    $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
                    file_put_contents($path, $newJsonString);
                } else {
                    $aResult['error'] = 'File not found';
                }
                break;

            default:
               $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
               break;
        }

    }

    echo json_encode($aResult);
?>