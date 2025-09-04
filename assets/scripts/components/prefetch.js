function prefetch(url) {
  if (!document.querySelector(`link[href="${url}"]`)) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }
}

document.querySelectorAll('a[data-prefetch]').forEach(link => {
  const prefetchHandler = () => prefetch(link.href);

  link.addEventListener('mouseenter', prefetchHandler);
  link.addEventListener('mousedown', prefetchHandler);
  link.addEventListener('touchstart', prefetchHandler, { passive: true }); // Mark as passive
});