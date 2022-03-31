export default function usePlatformType() {
    if ((window as any).milleniumRenderingType === 'desktop') {
        return 'desktop';
    } else if ((window as any).milleniumRenderingType === 'mobile') {
        return 'mobile';
    } else {
        return 'web';
    }
}
