<?php

function checkRouteIsActive($route, $parameters = [])
{
    if (is_array($route)) {
        return in_array(\Route::currentRouteName(), $route) ? 'active' : '';
    } elseif (is_string($route)) {
        return \Route::currentRouteName() == $route ? 'active' : '';
    } elseif ($route instanceof \Illuminate\Routing\Route) {
        return \Route::currentRoute() == $route ? 'active' : '';
    }
    return '';
}