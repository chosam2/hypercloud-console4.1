import { NetworkPolicySidebar } from './network-policy-sidebar';
import { RoleSidebar } from './role-sidebar';
import { BuildConfigSidebar } from './build-config-sidebar';
import { VirtualMachineSidebar } from './virtual-machine-sidebars';
import { PodSidebar } from './pod-sidebar';
import { JobSidebar } from './job-sidebar';
import { ReplicaSetSidebar } from './replica-set-sidebar';
import { DaemonSetSidebar } from './daemon-set-sidebar';
import { StatefulSetSidebar } from './stateful-set-sidebar';

import { ClusterServiceBrokerSidebar } from './cluster-service-broker-sidebar';
import { ServiceInstanceSidebar } from './service-instance-sidebar';
import { ServiceBindingSidebar } from './service-binding-sidebar';
import { TemplateSidebar } from './template-sidebar';
import { TemplateInstanceSidebar } from './template-instance-sidebar';

// sidebar 추가 시 여기에 컴포넌트 연결해줘야함
// .set(kind, 사이드바 컴포넌트명)
export const resourceSidebars = new Map<string, React.ComponentType<any>>()
.set('ClusterServiceBroker', ClusterServiceBrokerSidebar)
.set('ServiceInstance', ServiceInstanceSidebar)
.set('ServiceBinding', ServiceBindingSidebar)
.set('Template', TemplateSidebar)
.set('TemplateInstance', TemplateInstanceSidebar)
.set('Pod', PodSidebar)
.set('ReplicaSet', ReplicaSetSidebar)
.set('Job', JobSidebar)
.set('DaemonSet', DaemonSetSidebar)
.set('StatefulSet', StatefulSetSidebar)
.set('NetworkPolicy', NetworkPolicySidebar)
.set('Role', RoleSidebar).set('ClusterRole', RoleSidebar)
.set('VirtualMachine', VirtualMachineSidebar)
.set('BuildConfig', BuildConfigSidebar)
;
