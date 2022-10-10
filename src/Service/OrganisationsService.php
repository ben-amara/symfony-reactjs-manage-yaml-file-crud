<?php

namespace App\Service;

use Symfony\Component\Yaml\Yaml;


class OrganisationsService
{

    private $path_yaml_file;

    public function __construct($organisation_file_path)
    {
        $this->path_yaml_file = $organisation_file_path;
        $this->organisations = Yaml::parseFile($organisation_file_path);
    }



    public function getPathStorageFile()
    {
        return $this->path_yaml_file;
    }

    public function getAllOrganisations()
    {
        return $this->organisations;
    }

    public function addOrganisation($array)
    {
        $array = json_decode($array, true);
        if ($this->isExist($array['name'])) {
            return [["message" => "This organisation already exist"], 403];
        }

        $this->organisations['organizations'][] = $array;
        $yaml = Yaml::dump(json_decode(json_encode($this->organisations, 15), true), 5, 2);

        file_put_contents($this->path_yaml_file, $yaml);
        return [["message" => "Successfully added"], 200];
    }

    public function updateOrganisation($array, $index)
    {
        $array = json_decode($array, true);
        if (!$this->isExistIndex($index)) {
            return [["message" => "This organisation doesn't exist"], 403];
        }

        $this->organisations['organizations'][$index] = $array;
        $yaml = Yaml::dump(json_decode(json_encode($this->organisations, 15), true), 5, 2);

        file_put_contents($this->path_yaml_file, $yaml);
        return [["message" => "Successfully updated"], 200];
    }

    public function deleteOrganisation($organisation_name)
    {
        if (!$this->isExist($organisation_name)) {
            return [["message" => "this organisation doesn't exist"], 403];
        }

        $organisation_index =  $this->getOrganisationIndex($organisation_name);
        array_splice($this->organisations['organizations'], $organisation_index, 1);
        $yaml = Yaml::dump($this->organisations, 5, 2);

        file_put_contents($this->path_yaml_file, $yaml);
        return [["message" => "Successfully deleted"], 200];
    }

    private function isExist($key)
    {
        foreach ($this->organisations['organizations'] as $organisation) {
            if (strtolower($key) === strtolower($organisation['name'])) {
                return true;
            }
        }
        return false;
    }

    private function getOrganisationIndex($key)
    {
        foreach ($this->organisations['organizations'] as $index => $organisation) {
            if (strtolower($key) === strtolower($organisation['name'])) {
                return $index;
            }
        }
        return false;
    }

    private function isExistIndex($key)
    {
        foreach ($this->organisations['organizations'] as $index => $organisation) {
            if ($key == $index) {
                return "true";
            }
        }
        return "false";
    }
}
