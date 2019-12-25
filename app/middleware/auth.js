export default function({app, store, route, redirect, error}) {
    if (process.server) {
        return;
    }


    const urlRequiresAuth = [
        /^(\/ru)?\/account(\/|$)/,
        /^(\/ru)?\/checks(\/|$)/,
        /^(\/ru)?\/coiner(\/|$)/,
        /^(\/ru)?\/convert(\/|$)/,
        /^(\/ru)?\/dao(\/|$)/,
        /^(\/ru)?\/delegation(\/|$)/,
        /^(\/ru)?\/masternode(\/|$)/,
        /^(\/ru)?\/pco(\/|$)/,
        /^(\/ru)?\/support(\/|$)/,
        /^(\/ru)?\/portfolio(\/|$)/,
    ].some((pathRegex) => {
        return pathRegex.test(route.path);
    });

    const urlAllowsNonAuth = [
        /^(\/ru)?\/confirm/,
    ].some((pathRegex) => {
        return pathRegex.test(route.path);
    });

    // const urlRequiresNonAuth = /^\/auth(\/|$)/.test(route.path);
    // const urlRequiresUserWithProfile = [
    //     /^\/settings\/profile-/,
    // ].some((pathRegex) => {
    //     return pathRegex.test(route.path);
    // });
    // console.log(store.getters.isAuthorized, urlRequiresAuth, urlAllowsNonAuth)

    if (!store.getters.isAuthorized && urlRequiresAuth) {
        return  redirect('/');
    }
    // if (store.getters.isAuthorized && urlRequiresNonAuth) {
    //     console.log('-- restricted: redirect to index');
    //     return redirect('/auth');
    // }

    // if (!store.getters.isUserWithProfile && urlRequiresUserWithProfile) {
    //     console.log('-- restricted: 404 settings not available');
    //     return error({statusCode: 404, message: 'Page not found'});
    // }

    return Promise.resolve();
}
