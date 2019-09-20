function isDesktop() {
    return process.client && document.body.clientWidth >= 700;
}
export  {isDesktop}
