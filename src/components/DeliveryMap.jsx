import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const API_KEY =  '9e6d5c6f48mshcd1f1fe608b2525p1c6a8cjsn1f46b49291c8';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

// Mock house location (e.g. Seminyak, Bali)
const MERTUA_LOC = { lat: -8.6946, lng: 115.1584 };
// Mock user location
const USER_LOC = { lat: -8.6750, lng: 115.1750 };

export default function DeliveryMap() {
    if (!hasValidKey) {
        return (
            <div className="w-full h-full bg-brand-darker flex flex-col items-center justify-center p-12 text-center border border-white/5">
                <h3 className="text-xl font-black italic tracking-tighter uppercase mb-4 text-brand-red">MAPS NOT CONFIGURED</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-xs">
                    To see the live tracking map, please configure your <strong>GOOGLE_MAPS_PLATFORM_KEY</strong> in the environment.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative border-8 border-brand-red md:border-[16px]">
            <APIProvider apiKey={API_KEY} version="weekly">
                <Map
                    defaultCenter={MERTUA_LOC}
                    defaultZoom={13}
                    mapId="DEMO_MAP_ID"
                    className="grayscale invert brightness-75 contrast-125"
                    disableDefaultUI
                    internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                    style={{ width: '100%', height: '100%' }}
                >
                    {/* Restaurant Marker */}
                    <AdvancedMarker position={MERTUA_LOC} title="House Of Mertua">
                        <div className="w-10 h-10 bg-brand-red p-2 flex items-center justify-center shadow-2xl animate-pulse">
                            <span className="font-black text-white text-[10px]">HMT</span>
                        </div>
                    </AdvancedMarker>

                    {/* User Destination */}
                    <AdvancedMarker position={USER_LOC} title="Your Location">
                        <Pin background="#fff" glyphColor="#820000" scale={1.2} />
                    </AdvancedMarker>
                </Map>
            </APIProvider>

            {/* Map Overlay Text */}
            <div className="absolute top-8 left-8 z-10 pointer-events-none">
                <div className="bg-brand-red text-white p-6 inline-block transform -rotate-1 shadow-2xl">
                    <h4 className="text-[10px] wide-tracking mb-1">Live Tracking</h4>
                    <div className="text-2xl font-black italic tracking-tighter italic">DELIVERY IN PROGRESS</div>
                </div>
            </div>
        </div>
    );
}
