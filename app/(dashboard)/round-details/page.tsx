import { RoundDetailsWrapper } from "@/app/(dashboard)/round-details/round/round-details-wrapper";
import KibanaLogWrapper from "./kibana/kibana-wrapper";
import UnifiedBackOfficeDashboard from "./backoffice-dashboard/unified-dashboard";

export default function Page() {
    return (
       <>
        {/* <RoundDetailsWrapper /> */}
        <UnifiedBackOfficeDashboard />
        {/* <KibanaLogWrapper /> */}

       </>
    );
}