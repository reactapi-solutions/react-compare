flowchart TB

%% =======================
%% Enterprise Styling
%% =======================

classDef waf fill:#3E6EA8,stroke:#27496d,color:#fff,stroke-width:1px,rx:8,ry:8;
classDef primary fill:#4F81BD,stroke:#1f3a5f,color:#fff,stroke-width:1px,rx:8,ry:8;
classDef standby fill:#7EA6D9,stroke:#1f3a5f,color:#fff,stroke-width:1px,rx:8,ry:8;
classDef segment fill:#DCE6F2,stroke:#5b7aa6,color:#000,stroke-dasharray: 5 5;
classDef engineer fill:#B7CCE3,stroke:#27496d,color:#000;

%% =======================
%% Production Topology Container
%% =======================

subgraph PROD["Production Topology — NADC BIGIQ Active/Standby Deployment"]
direction LR

%% -----------------------
%% NA-NW-C01
%% -----------------------
subgraph C01["NA-NW-C01"]
direction TB
WAF1["PSaaS WAF<br/>[HA Cluster farm]"]:::waf
P115["BIQ 115 [P]"]:::primary
S116["BIQ 116 [S]"]:::standby
WAF1 <--> P115
P115 <--> S116
end

%% -----------------------
%% NA-NW-C02
%% -----------------------
subgraph C02["NA-NW-C02"]
direction TB
WAF2["PSaaS WAF<br/>[HA Cluster farm]"]:::waf
P117["BIQ 117 [P]"]:::primary
S118["BIQ 118 [S]"]:::standby
WAF2 <--> P117
P117 <--> S118
end

%% -----------------------
%% NA-NE-C01
%% -----------------------
subgraph C03["NA-NE-C01"]
direction TB
WAF3["PSaaS WAF<br/>[HA Cluster farm]"]:::waf
P116["BIQ 116 [P]"]:::primary
S115["BIQ 115 [S]"]:::standby
WAF3 <--> P116
P116 <--> S115
end

%% -----------------------
%% NA-NE-C02
%% -----------------------
subgraph C04["NA-NE-C02"]
direction TB
WAF4["PSaaS WAF<br/>[HA Cluster farm]"]:::waf
P118["BIQ 118 [P]"]:::primary
S117["BIQ 117 [S]"]:::standby
WAF4 <--> P118
P118 <--> S117
end

%% Primary Inter-site Links (dashed)
P115 <-.-> P117
P117 <-.-> P116
P116 <-.-> P118

%% Standby Inter-site Links (dashed)
S116 <-.-> S118
S118 <-.-> S115
S115 <-.-> S117

end

%% =======================
%% NMS Segment
%% =======================

NMS["NMS segment"]:::segment
ENG["NETWORK ENGINEERS<br/>IN LSF SEGMENT"]:::engineer

ENG --> NMS
NMS --> S116
