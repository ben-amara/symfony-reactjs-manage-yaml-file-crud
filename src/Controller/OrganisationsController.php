<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\OrganisationsService;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/api", name="organisation_")
 */
class OrganisationsController extends AbstractController
{

    /**
     * @Route("/organisation", name="organisation_list")
     * @Method ({"GET"})
     */
    public function organisation(OrganisationsService $organisationsService)
    {

        $organisations = $organisationsService->getAllOrganisations();
        return new JsonResponse($organisations);
    }

    /**
     * @Route ("/organisation/new", name="organisation_add")
     * Method ({"POST"})
     */
    public function new(Request $request, OrganisationsService $organisationsService)
    {
        [$message, $status] = $organisationsService->addOrganisation($request->getContent());
        return new JsonResponse($message, $status);
    }

    /**
     * @Route ("/organisation/{index<\d+>}", name="organisation_update")
     * Method ({"UPDATE"})
     */
    public function update(Request $request, $index, OrganisationsService $organisationsService)
    {
        [$message, $status] = $organisationsService->updateOrganisation($request->getContent(), $index);
        return new JsonResponse($message, $status);
    }

    /**
     * @Route ("/organisation/{name}/delete", name="organisation_delete")
     * Method ({"DELETE"})
     */
    public function delete(Request $request, $name, OrganisationsService $organisationsService)
    {
        [$message, $status] = $organisationsService->deleteOrganisation($name);
        return new JsonResponse($message, $status);
    }
}
