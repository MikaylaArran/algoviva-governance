export const REGION_STATS = {
  Africa:         { enacted: 8,  draft: 4,  guidelines: 3,  total: 54 },
  Europe:         { enacted: 12, draft: 5,  guidelines: 8,  total: 44 },
  'Asia-Pacific': { enacted: 6,  draft: 7,  guidelines: 4,  total: 37 },
  Americas:       { enacted: 3,  draft: 4,  guidelines: 3,  total: 35 },
  'Middle East':  { enacted: 1,  draft: 3,  guidelines: 4,  total: 14 },
};

export const COUNTRIES = [
  { name:'Namibia', region:'Africa', status:'draft', regs:['Namibia Data Protection Act (2022)','SADC AI Framework (2023)','ISO 42001:2023'], notes:"Namibia enacted comprehensive data protection legislation in 2022. AI-specific regulation is emerging through the SADC regional framework. Sector-specific rules for health and finance are under development." },
  { name:'Nigeria', region:'Africa', status:'enacted', regs:['Nigeria Data Protection Act (2023)','NITDA AI Policy Framework (2023)','FCCPC AI Guidelines'], notes:"Nigeria has a strong data protection framework through NDPA 2023, administered by the NDPC. The AI Policy Framework establishes principles for trustworthy AI." },
  { name:'Kenya', region:'Africa', status:'draft', regs:['Kenya Data Protection Act (2019)','Kenya National AI Strategy (Draft 2023)','ODPC Guidelines'], notes:"Kenya has robust data protection through the DPA 2019. A National AI Strategy is in active development. The ODPC actively enforces data rights." },
  { name:'Rwanda', region:'Africa', status:'enacted', regs:['Rwanda Data Protection Law (2021)','Rwanda National AI Policy (2023)','RURA Digital Guidelines'], notes:"Rwanda is among Africa's most advanced AI governance jurisdictions. The National AI Policy 2023 provides a clear framework aligned with Vision 2050." },
  { name:'South Africa', region:'Africa', status:'draft', regs:['POPIA (2020)','SA AI Governance Framework (Draft 2024)','FSCA AI Guidelines (Draft)'], notes:"POPIA is fully enforced. A dedicated AI Governance Framework is in public consultation. The FSCA has issued draft AI guidelines for regulated entities." },
  { name:'Ghana', region:'Africa', status:'enacted', regs:['Ghana Data Protection Act (2012, amended)','Ghana National AI Policy (2023)','GBA Digital Finance Guidelines'], notes:"Ghana has a long-standing data protection regime. The 2023 National AI Policy establishes principles for inclusive and ethical AI development." },
  { name:'Egypt', region:'Africa', status:'enacted', regs:['Egypt PDPL (2020)','Egypt National AI Strategy (2022)','Egypt Digital Health Framework'], notes:"Egypt has enacted comprehensive personal data protection and published a detailed national AI strategy with sectoral implementation roadmaps." },
  { name:'Ethiopia', region:'Africa', status:'guidelines', regs:['Ethiopia DPA (Draft 2024)','ISO 42001:2023','NIST AI RMF (default baseline)'], notes:"Ethiopia is developing its data protection legislation. International standards (ISO 42001, NIST AI RMF) constitute the responsible governance baseline." },
  { name:'Morocco', region:'Africa', status:'enacted', regs:['Morocco Law 09-08 (Data Protection)','CNDP Guidelines','Digital Morocco 2030'], notes:"Morocco has a well-established data protection framework. The Digital Morocco 2030 strategy includes AI governance pillars." },
  { name:'Mauritius', region:'Africa', status:'enacted', regs:['Mauritius Data Protection Act (2017)','Mauritius AI Strategy (2018)','FSC Guidelines'], notes:"Mauritius published Africa's first national AI strategy in 2018. The FSC has issued AI-related guidance for financial services." },
  { name:'Uganda', region:'Africa', status:'enacted', regs:['Uganda DPDPA (2019)','Uganda National AI Strategy (2023)','NITA-U Guidelines'], notes:"Uganda enacted data protection legislation in 2019. The 2023 National AI Strategy provides a forward-looking framework, with NITA-U as the implementing body." },
  { name:'Tanzania', region:'Africa', status:'guidelines', regs:['Tanzania DPA (Draft 2024)','ISO 42001:2023','NIST AI RMF (default baseline)'], notes:"Tanzania is finalising data protection legislation. International standards provide the responsible governance baseline for AI builders." },
  { name:'Senegal', region:'Africa', status:'draft', regs:['Senegal Data Protection Law (2008, revised)','ECOWAS AI Framework (Draft)','CDP Guidelines'], notes:"Senegal has an established data protection framework. ECOWAS-level AI governance discussions are ongoing." },
  { name:'Botswana', region:'Africa', status:'draft', regs:['Botswana Data Protection Act (2018)','Botswana National AI Policy (Draft 2024)'], notes:"Botswana enacted data protection in 2018. A national AI policy is in development." },
  { name:'Zimbabwe', region:'Africa', status:'guidelines', regs:['Zimbabwe Cybersecurity Act (2021)','ISO 42001:2023','NIST AI RMF (default baseline)'], notes:"Zimbabwe's Cybersecurity Act covers some AI-adjacent areas. International standards apply as baseline." },
  { name:'Tunisia', region:'Africa', status:'draft', regs:['Tunisia DPA (2004, revised)','Tunisia Digital Economy Strategy'], notes:"Tunisia has data protection in place. AI-specific regulation is under discussion within digital economy strategy development." },
  { name:'European Union', region:'Europe', status:'enacted', regs:['EU AI Act (2024)','EU GDPR (2018)','EU AI Liability Directive (Draft)'], notes:"The EU AI Act is the world's first comprehensive horizontal AI law, with obligations scaled to risk level." },
  { name:'United Kingdom', region:'Europe', status:'guidelines', regs:['UK GDPR (2021)','UK AI Regulation White Paper (2023)','ICO AI Guidance'], notes:"The UK has opted for a principles-based, sector-led approach rather than a single AI Act." },
  { name:'Germany', region:'Europe', status:'enacted', regs:['EU AI Act (2024)','Germany BDSG','Germany AI Strategy (2023)'], notes:"Germany applies the EU AI Act framework plus national BDSG data protection." },
  { name:'United States', region:'Americas', status:'guidelines', regs:['NIST AI RMF (2023)','Executive Order on AI (2023)','State-level AI Laws (multiple)'], notes:"No comprehensive federal AI law yet. The Executive Order on AI (2023) directs federal agencies to adopt NIST AI RMF." },
  { name:'Canada', region:'Americas', status:'draft', regs:['Canada AIDA (Draft 2022)','PIPEDA (2000)','OPC AI Guidance'], notes:"Canada's Artificial Intelligence and Data Act (AIDA) is pending parliamentary approval. PIPEDA governs personal data." },
  { name:'Brazil', region:'Americas', status:'draft', regs:['Brazil LGPD (2020)','Brazil AI Bill (PL 2338/2023)','Anatel AI Guidelines'], notes:"Brazil's comprehensive AI Bill is advancing through parliament. LGPD provides the existing data protection framework." },
  { name:'China', region:'Asia-Pacific', status:'enacted', regs:['China PIPL (2021)','China Generative AI Regulations (2023)','China Algorithm Recommendation Rules (2022)'], notes:"China has the most comprehensive AI-specific regulatory suite globally." },
  { name:'India', region:'Asia-Pacific', status:'draft', regs:['India DPDP Act (2023)','India AI Advisory (MeitY 2024)','SEBI AI Guidelines'], notes:"India enacted its Digital Personal Data Protection Act in 2023. A formal AI regulatory framework is expected." },
  { name:'Singapore', region:'Asia-Pacific', status:'guidelines', regs:['Singapore PDPA (2012, revised 2021)','Singapore AI Governance Framework (2020)','MAS AI Guidelines'], notes:"Singapore leads on voluntary AI governance frameworks. MAS has issued guidelines for financial sector AI." },
  { name:'Japan', region:'Asia-Pacific', status:'guidelines', regs:['Japan APPI (revised 2022)','Japan AI Guidelines (2024)','METI AI Governance'], notes:"Japan takes a principles-based, agile approach to AI regulation." },
  { name:'UAE', region:'Middle East', status:'guidelines', regs:['UAE AI Strategy 2031','UAE ADGM AI Guidance','Dubai AI Ethics Guidelines'], notes:"UAE is positioning itself as a global AI hub. Abu Dhabi Global Market (ADGM) has issued financial sector AI guidance." },
  { name:'Saudi Arabia', region:'Middle East', status:'guidelines', regs:['Saudi Arabia PDPL (2021)','SDAIA AI Ethics Principles (2022)','NDMO Data Governance'], notes:"Saudi Arabia enacted personal data protection in 2021. SDAIA has published AI ethics principles." },
];

export const STAGE_HINTS = {
  'pre-concept': 'At this stage: understand what regulations will apply so you can design for compliance from day one. Know before you build.',
  'planning': 'At this stage: document your data flows, assess risk level, and identify which obligations require design decisions now.',
  'building': 'At this stage: implement technical controls, data protection measures, and prepare required documentation.',
  'testing': 'At this stage: conduct required assessments (DPIA, conformity assessment), test for bias and fairness, and prepare audit trails.',
  'deployed': 'At this stage: monitor for drift, respond to data subject rights requests, and maintain ongoing compliance records.',
};

export const STAGE_ORDER = ['pre-concept','planning','building','testing','deployed'];

export const CDB = {
  Namibia: {
    health: { regulations: [
      { title:'Namibia Data Protection Act, 2022', status:'enacted', url:'https://www.parliament.na/acts/', obligations:[
        { id:'na-dpa-1', text:'Appoint a Data Protection Officer (DPO)', severity:'MUST', stage_from:'planning', cite_ref:'Namibia DPA s.24', cite_text:'The responsible party must designate a data protection officer where processing is carried out on a large scale. The DPO must have expert knowledge of data protection law and practices.' },
        { id:'na-dpa-2', text:'Conduct a Data Protection Impact Assessment (DPIA) before processing health data', severity:'MUST', stage_from:'planning', cite_ref:'Namibia DPA s.31', cite_text:'A data protection impact assessment shall be carried out prior to the processing of health data, biometric data, or data likely to result in high risk to data subjects.' },
        { id:'na-dpa-3', text:'Obtain explicit consent from patients before processing their health data', severity:'MUST', stage_from:'building', cite_ref:'Namibia DPA s.14', cite_text:'Processing of personal data concerning health shall only be permitted where the data subject has given explicit consent, or where necessary for medical diagnosis or the provision of health care.' },
        { id:'na-dpa-4', text:'Implement appropriate technical and organisational security measures', severity:'MUST', stage_from:'building', cite_ref:'Namibia DPA s.35', cite_text:'The responsible party must implement appropriate technical and organisational measures to protect personal data against accidental or unlawful destruction, loss, or unauthorised disclosure.' },
        { id:'na-dpa-5', text:'Register processing activities with the Information Regulator', severity:'MUST', stage_from:'planning', cite_ref:'Namibia DPA s.42', cite_text:'Any person processing personal data on a large scale must notify the Information Regulator and register the processing activity.' },
        { id:'na-dpa-6', text:'Ensure data minimisation — collect only data strictly necessary for the AI purpose', severity:'SHOULD', stage_from:'planning', cite_ref:'Namibia DPA s.10', cite_text:'Personal data must be adequate, relevant, and not excessive in relation to the purpose for which it is processed.' },
        { id:'na-dpa-7', text:'Establish a data retention and deletion schedule', severity:'SHOULD', stage_from:'building', cite_ref:'Namibia DPA s.12', cite_text:'Personal data must not be retained for longer than necessary to achieve the purpose for which it was collected.' },
      ]},
      { title:'SADC AI Framework, 2023', status:'guidelines', url:'https://www.sadc.int/', obligations:[
        { id:'sadc-1', text:"Document the AI system's purpose, capabilities, and limitations in a model card", severity:'SHOULD', stage_from:'building', cite_ref:'SADC AI Framework §3.2', cite_text:'Member states are encouraged to require developers to document AI system capabilities, limitations, training data provenance, and intended use cases to enable transparency and accountability.' },
        { id:'sadc-2', text:'Implement human oversight mechanisms for AI-assisted clinical decisions', severity:'MUST', stage_from:'building', cite_ref:'SADC AI Framework §4.1', cite_text:'AI systems used in health care must maintain meaningful human oversight. Clinical decisions made with AI assistance must be reviewable and reversible by qualified health professionals.' },
        { id:'sadc-3', text:'Test for bias across gender, age, and ethnicity relevant to Namibian patient demographics', severity:'SHOULD', stage_from:'testing', cite_ref:'SADC AI Framework §5.3', cite_text:'AI systems must be evaluated for discriminatory outputs across demographic groups. Health AI must specifically address performance disparities that could result in unequal care.' },
      ]},
      { title:'ISO/IEC 42001:2023 — AI Management System', status:'standard', url:'https://www.iso.org/standard/81230.html', obligations:[
        { id:'iso-h1', text:'Establish an AI policy and assign accountability for AI governance', severity:'SHOULD', stage_from:'pre-concept', cite_ref:'ISO 42001 §5.2', cite_text:'Top management shall establish an AI policy that provides a framework for setting AI objectives and includes a commitment to responsible AI use.' },
        { id:'iso-h2', text:'Conduct AI risk assessment covering technical, ethical, and societal impacts', severity:'SHOULD', stage_from:'planning', cite_ref:'ISO 42001 §6.1', cite_text:'The organisation shall plan, implement, control, and maintain a process for AI risk assessment, including assessment of technical risks, ethical considerations, and potential impacts.' },
        { id:'iso-h3', text:'Document and control training data sources and data quality procedures', severity:'SHOULD', stage_from:'building', cite_ref:'ISO 42001 §8.4', cite_text:'The organisation shall establish controls over AI data, including data provenance, quality assessment, and handling of personal data in training datasets.' },
      ]},
    ]},
    finance: { regulations: [
      { title:'Namibia Data Protection Act, 2022', status:'enacted', url:'https://www.parliament.na/acts/', obligations:[
        { id:'na-fin-1', text:'Appoint a Data Protection Officer', severity:'MUST', stage_from:'planning', cite_ref:'Namibia DPA s.24', cite_text:'The responsible party must designate a data protection officer where processing is carried out on a large scale.' },
        { id:'na-fin-2', text:'Implement data protection by design and by default', severity:'MUST', stage_from:'planning', cite_ref:'Namibia DPA s.36', cite_text:'The responsible party shall implement data protection principles from the design stage of any system, process, or service.' },
        { id:'na-fin-3', text:'Provide clear disclosure when AI is used in credit or lending decisions', severity:'MUST', stage_from:'building', cite_ref:'Namibia DPA s.20', cite_text:'Where automated processing produces decisions with significant effects on a data subject, the data subject must be informed and has the right to request human review.' },
        { id:'na-fin-4', text:'Implement mechanisms for customers to contest automated financial decisions', severity:'MUST', stage_from:'building', cite_ref:'Namibia DPA s.21', cite_text:'Data subjects must have the right to request that any decision subject to automated processing be reconsidered by a human reviewer.' },
      ]},
    ]},
    general: { regulations: [
      { title:'Namibia Data Protection Act, 2022', status:'enacted', url:'https://www.parliament.na/acts/', obligations:[
        { id:'na-gen-1', text:'Register processing activities with the Information Regulator', severity:'MUST', stage_from:'planning', cite_ref:'Namibia DPA s.42', cite_text:'Any person processing personal data on a large scale must notify the Information Regulator and register the processing activity.' },
        { id:'na-gen-2', text:'Implement lawful basis for all data processing', severity:'MUST', stage_from:'planning', cite_ref:'Namibia DPA s.8', cite_text:'Personal data may only be processed if a lawful basis exists: consent, contract, legal obligation, vital interests, public task, or legitimate interests.' },
        { id:'na-gen-3', text:'Respect data subject rights: access, correction, deletion, objection', severity:'MUST', stage_from:'building', cite_ref:'Namibia DPA s.17-23', cite_text:'Data subjects have the right to access their personal data, have inaccurate data corrected, request deletion, and object to certain processing.' },
      ]},
    ]},
  },
  Nigeria: {
    health: { regulations: [
      { title:'Nigeria Data Protection Act, 2023', status:'enacted', url:'https://ndpc.gov.ng/', obligations:[
        { id:'ng-h1', text:'Conduct mandatory DPIA for health AI', severity:'MUST', stage_from:'planning', cite_ref:'Nigeria NDPA s.28', cite_text:'A data controller conducting processing likely to result in high risk to the rights and freedoms of data subjects must carry out a data protection impact assessment prior to the processing.' },
        { id:'ng-h2', text:'Register as a data controller with the NDPC', severity:'MUST', stage_from:'planning', cite_ref:'Nigeria NDPA s.32', cite_text:'A data controller of major importance must register with the Commission not later than six months after the commencement of this Act.' },
        { id:'ng-h3', text:'Obtain explicit consent for processing health data', severity:'MUST', stage_from:'building', cite_ref:'Nigeria NDPA s.25(2)', cite_text:'The processing of sensitive personal data shall be prohibited unless the data subject has given explicit consent to the processing of that personal data for one or more specified purposes.' },
        { id:'ng-h4', text:'Appoint a Data Protection Compliance Organisation (DPCO)', severity:'SHOULD', stage_from:'planning', cite_ref:'Nigeria NDPA s.34', cite_text:'A data controller may engage a data protection compliance organisation to advise on compliance with this Act.' },
      ]},
      { title:'NITDA AI Policy Framework, 2023', status:'guidelines', url:'https://nitda.gov.ng/', obligations:[
        { id:'nitda-1', text:'Document AI system transparency disclosures for end users', severity:'SHOULD', stage_from:'building', cite_ref:'NITDA AI Framework §6.1', cite_text:"AI systems deployed in Nigeria must provide clear disclosure of their AI nature to users, explain how decisions are made in accessible language, and enable users to seek human review." },
        { id:'nitda-2', text:'Implement bias testing relevant to Nigerian demographic diversity', severity:'SHOULD', stage_from:'testing', cite_ref:'NITDA AI Framework §7.3', cite_text:"Developers must conduct fairness testing across Nigeria's diverse demographic groups, including gender, ethnicity, language, and socioeconomic status." },
      ]},
    ]},
    general: { regulations: [
      { title:'Nigeria Data Protection Act, 2023', status:'enacted', url:'https://ndpc.gov.ng/', obligations:[
        { id:'ng-g1', text:'Register with NDPC as data controller', severity:'MUST', stage_from:'planning', cite_ref:'Nigeria NDPA s.32', cite_text:'A data controller of major importance must register with the Commission not later than six months after the commencement of this Act.' },
        { id:'ng-g2', text:'Implement lawful basis for all personal data processing', severity:'MUST', stage_from:'planning', cite_ref:'Nigeria NDPA s.25', cite_text:'The processing of personal data shall be lawful only if based on consent, contract, legal obligation, vital interests, public task, or legitimate interests.' },
        { id:'ng-g3', text:'Establish data subject rights procedures (access, correction, erasure)', severity:'MUST', stage_from:'building', cite_ref:'Nigeria NDPA s.35-42', cite_text:'Data subjects have the right to access personal data, rectify inaccurate data, and in certain circumstances, erase their data. Controllers must respond within 30 days.' },
      ]},
    ]},
  },
  'European Union': {
    health: { regulations: [
      { title:'EU AI Act, 2024', status:'enacted', url:'https://artificialintelligenceact.eu/', obligations:[
        { id:'euai-h1', text:'Classify your AI system — health diagnostic AI is likely HIGH RISK', severity:'MUST', stage_from:'pre-concept', cite_ref:'EU AI Act Annex III', cite_text:'AI systems intended to be used for medical devices, or AI intended to be used for making decisions in the context of health and safety of persons, are classified as high-risk AI systems under Annex III.' },
        { id:'euai-h2', text:'Register high-risk AI system in the EU AI Act database before deployment', severity:'MUST', stage_from:'testing', cite_ref:'EU AI Act Art. 71', cite_text:'Providers of high-risk AI systems shall register themselves and their systems in the EU database before placing the system on the market.' },
        { id:'euai-h3', text:'Prepare technical documentation demonstrating compliance', severity:'MUST', stage_from:'building', cite_ref:'EU AI Act Art. 11', cite_text:'Providers of high-risk AI systems shall draw up technical documentation before placing that system on the market.' },
        { id:'euai-h4', text:'Implement a post-market monitoring system', severity:'MUST', stage_from:'deployed', cite_ref:'EU AI Act Art. 72', cite_text:'Providers of high-risk AI systems shall establish and document a post-market monitoring system appropriate to the nature of the AI technology.' },
        { id:'euai-h5', text:'Conduct conformity assessment (self-assessment or third party)', severity:'MUST', stage_from:'testing', cite_ref:'EU AI Act Art. 43', cite_text:'High-risk AI systems shall undergo a conformity assessment procedure before being placed on the market. For medical AI, third-party conformity assessment is required.' },
        { id:'euai-h6', text:'Appoint an EU representative if deploying from outside the EU', severity:'MUST', stage_from:'planning', cite_ref:'EU AI Act Art. 22', cite_text:'Where neither the provider nor the importer is established in the Union, providers shall designate an authorised representative established in the Union.' },
      ]},
      { title:'EU GDPR, 2018', status:'enacted', url:'https://gdpr-info.eu/', obligations:[
        { id:'gdpr-h1', text:'Conduct DPIA before processing health data at scale', severity:'MUST', stage_from:'planning', cite_ref:'GDPR Art. 35', cite_text:'Where processing is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall carry out an assessment of the impact on the protection of personal data prior to processing.' },
        { id:'gdpr-h2', text:'Identify lawful basis for processing special category health data', severity:'MUST', stage_from:'planning', cite_ref:'GDPR Art. 9', cite_text:'Processing of personal data concerning health shall be prohibited unless the data subject has given explicit consent, or processing is necessary for medical purposes.' },
      ]},
    ]},
    general: { regulations: [
      { title:'EU AI Act, 2024', status:'enacted', url:'https://artificialintelligenceact.eu/', obligations:[
        { id:'euai-g1', text:'Classify your AI system under EU AI Act risk framework', severity:'MUST', stage_from:'pre-concept', cite_ref:'EU AI Act Art. 6', cite_text:'AI systems shall be classified as high-risk where they are listed in Annex III or intended as a safety component of a product covered by Union harmonisation legislation.' },
        { id:'euai-g2', text:'Ensure prohibited AI practices are not used (social scoring, manipulation, etc.)', severity:'MUST', stage_from:'pre-concept', cite_ref:'EU AI Act Art. 5', cite_text:'The following AI practices shall be prohibited: AI systems using subliminal techniques, AI systems enabling social scoring by public authorities, real-time biometric identification in public spaces.' },
        { id:'euai-g3', text:'Implement human oversight measures for high-risk AI', severity:'MUST', stage_from:'building', cite_ref:'EU AI Act Art. 14', cite_text:'High-risk AI systems shall be designed and developed in such a way as to allow human oversight during the period in which the AI system is in use.' },
      ]},
    ]},
  },
  'South Africa': {
    health: { regulations: [
      { title:'POPIA, 2020', status:'enacted', url:'https://popia.co.za/', obligations:[
        { id:'sa-h1', text:'Appoint an Information Officer and register with the Information Regulator', severity:'MUST', stage_from:'planning', cite_ref:'POPIA s.55', cite_text:'The head of a private or public body must be the Information Officer of that body. The Information Officer must be registered with the Information Regulator.' },
        { id:'sa-h2', text:'Process health data only with explicit consent or lawful basis', severity:'MUST', stage_from:'building', cite_ref:'POPIA s.27', cite_text:'The processing of special personal information, including health data, is prohibited unless the data subject has given explicit consent or processing is necessary for medical purposes.' },
        { id:'sa-h3', text:'Notify the Regulator and data subjects of security compromises', severity:'MUST', stage_from:'deployed', cite_ref:'POPIA s.22', cite_text:'Where there are reasonable grounds to believe that personal information has been accessed by any unauthorised person, the responsible party must notify the Regulator and the data subject.' },
      ]},
      { title:'SA AI Governance Framework (Draft 2024)', status:'draft', url:'https://www.dsit.gov.za/', obligations:[
        { id:'sa-ai-1', text:'Implement transparency requirements for AI-assisted clinical decisions', severity:'SHOULD', stage_from:'building', cite_ref:'SA AI Framework §4.2', cite_text:"AI systems used in health care should make their use transparent to patients and clinicians. Patients should be informed when AI has contributed to their diagnosis or treatment recommendation." },
        { id:'sa-ai-2', text:"Assess AI system for bias across South Africa's demographic groups", severity:'SHOULD', stage_from:'testing', cite_ref:'SA AI Framework §5.1', cite_text:"AI developers are encouraged to evaluate systems for differential performance across South Africa's diverse population, including race, gender, language, and socioeconomic factors." },
      ]},
    ]},
    general: { regulations: [
      { title:'POPIA, 2020', status:'enacted', url:'https://popia.co.za/', obligations:[
        { id:'sa-g1', text:'Appoint Information Officer and register with Information Regulator', severity:'MUST', stage_from:'planning', cite_ref:'POPIA s.55', cite_text:'The head of a private or public body must be the Information Officer. Must be registered with the Information Regulator.' },
        { id:'sa-g2', text:'Apply all eight POPIA conditions for lawful processing', severity:'MUST', stage_from:'building', cite_ref:'POPIA s.4', cite_text:'Personal information must be processed lawfully and in a reasonable manner that does not infringe privacy. The eight conditions for lawful processing must all be satisfied.' },
      ]},
    ]},
  },
  Kenya: {
    health: { regulations: [
      { title:'Kenya Data Protection Act, 2019', status:'enacted', url:'https://www.odpc.go.ke/', obligations:[
        { id:'ke-h1', text:'Register as a data controller / processor with the ODPC', severity:'MUST', stage_from:'planning', cite_ref:'Kenya DPA s.17', cite_text:'Every data controller or data processor shall register with the Data Commissioner. Processing without registration is an offence.' },
        { id:'ke-h2', text:'Conduct DPIA for health data processing', severity:'MUST', stage_from:'planning', cite_ref:'Kenya DPA s.31', cite_text:'A data controller shall carry out a data protection impact assessment where the processing is likely to result in a high risk to the rights and freedoms of the data subjects.' },
        { id:'ke-h3', text:'Obtain explicit consent for health data processing', severity:'MUST', stage_from:'building', cite_ref:'Kenya DPA s.30(2)', cite_text:'The processing of sensitive personal data shall only be permitted if the data subject has given explicit consent to the processing.' },
      ]},
    ]},
    general: { regulations: [
      { title:'Kenya Data Protection Act, 2019', status:'enacted', url:'https://www.odpc.go.ke/', obligations:[
        { id:'ke-g1', text:'Register with ODPC as data controller or processor', severity:'MUST', stage_from:'planning', cite_ref:'Kenya DPA s.17', cite_text:'Every data controller or data processor shall register with the Data Commissioner.' },
        { id:'ke-g2', text:'Establish lawful basis for all personal data processing', severity:'MUST', stage_from:'planning', cite_ref:'Kenya DPA s.30', cite_text:'Processing shall be lawful only if the data subject has given consent, processing is necessary for a contract, or another lawful basis applies.' },
      ]},
    ]},
  },
  default: {
    general: { regulations: [
      { title:'ISO/IEC 42001:2023 — AI Management System', status:'standard', url:'https://www.iso.org/standard/81230.html', obligations:[
        { id:'def-iso-1', text:'Establish an AI governance policy and assign top-level accountability', severity:'SHOULD', stage_from:'pre-concept', cite_ref:'ISO 42001 §5.2', cite_text:'Top management shall establish an AI policy providing a framework for setting AI objectives and includes a commitment to responsible AI use.' },
        { id:'def-iso-2', text:'Conduct AI risk assessment covering technical, ethical, and societal impacts', severity:'SHOULD', stage_from:'planning', cite_ref:'ISO 42001 §6.1', cite_text:'The organisation shall plan, implement, control, and maintain a process for AI risk assessment, including assessment of technical risks, ethical considerations, and potential impacts.' },
        { id:'def-iso-3', text:'Document and control training data sources and quality procedures', severity:'SHOULD', stage_from:'building', cite_ref:'ISO 42001 §8.4', cite_text:'The organisation shall establish controls over AI data, including data provenance, quality assessment, and handling of personal data in training datasets.' },
        { id:'def-iso-4', text:'Monitor AI system performance post-deployment', severity:'SHOULD', stage_from:'deployed', cite_ref:'ISO 42001 §9.1', cite_text:'The organisation shall evaluate AI system performance, including monitoring for model drift, unintended outputs, and changes in the data environment.' },
      ]},
      { title:'NIST AI Risk Management Framework (AI RMF 1.0)', status:'standard', url:'https://www.nist.gov/system/files/documents/2023/01/26/AI%20RMF%201.0.pdf', obligations:[
        { id:'def-nist-1', text:'MAP: Identify stakeholders, assess context, document use cases and potential impacts', severity:'SHOULD', stage_from:'pre-concept', cite_ref:'NIST AI RMF — MAP', cite_text:'The MAP function involves understanding the context, purpose, and potential impacts of the AI system, including identification of all relevant stakeholders and their interests.' },
        { id:'def-nist-2', text:'MEASURE: Test and evaluate AI risks through red-teaming and bias assessment', severity:'SHOULD', stage_from:'testing', cite_ref:'NIST AI RMF — MEASURE', cite_text:'The MEASURE function involves quantifying AI risks and impacts through evaluation, testing, and monitoring, including assessing for bias and performance disparities.' },
        { id:'def-nist-3', text:'MANAGE: Prioritise and document risk response plans', severity:'SHOULD', stage_from:'planning', cite_ref:'NIST AI RMF — MANAGE', cite_text:'The MANAGE function involves prioritising identified risks and implementing responses, including mitigations, transfer, or acceptance, with documented rationale.' },
      ]},
    ]},
  },
};

export const LIBRARY = [
  { name:'EU AI Act', country:'European Union', region:'Europe', year:2024, status:'enacted', themes:['AI regulation','High-risk AI','Transparency','Human oversight'], url:'https://artificialintelligenceact.eu/', desc:"The world's first comprehensive AI-specific regulation, establishing a risk-based framework." },
  { name:'EU GDPR', country:'European Union', region:'Europe', year:2018, status:'enacted', themes:['Data protection','Privacy','Consent','Data subject rights'], url:'https://gdpr-info.eu/', desc:'Foundational data protection regulation with provisions for automated decision-making.' },
  { name:'Namibia Data Protection Act', country:'Namibia', region:'Africa', year:2022, status:'enacted', themes:['Data protection','Health data','DPO','DPIA'], url:'https://www.parliament.na/acts/', desc:'Comprehensive data protection legislation establishing rights and obligations in Namibia.' },
  { name:'Nigeria Data Protection Act', country:'Nigeria', region:'Africa', year:2023, status:'enacted', themes:['Data protection','Consent','DPIA','Registration'], url:'https://ndpc.gov.ng/', desc:"Nigeria's landmark data protection law establishing the NDPC, data subject rights, and obligations." },
  { name:'Kenya Data Protection Act', country:'Kenya', region:'Africa', year:2019, status:'enacted', themes:['Data protection','Registration','DPIA','Sensitive data'], url:'https://www.odpc.go.ke/', desc:'Establishes data protection rights and the Office of the Data Protection Commissioner.' },
  { name:'Rwanda Data Protection Law', country:'Rwanda', region:'Africa', year:2021, status:'enacted', themes:['Data protection','Privacy','AI governance'], url:'https://www.dataguidance.com/notes/rwanda-data-protection-overview', desc:"Rwanda's comprehensive data protection framework." },
  { name:'Rwanda National AI Policy', country:'Rwanda', region:'Africa', year:2023, status:'enacted', themes:['AI strategy','Governance','Innovation'], url:'https://www.minict.gov.rw/', desc:"Rwanda's vision for responsible AI development aligned with Vision 2050." },
  { name:'Ghana Data Protection Act', country:'Ghana', region:'Africa', year:2012, status:'enacted', themes:['Data protection','Registration','Sensitive data'], url:'https://www.dataprotection.org.gh/', desc:"Ghana's data protection framework administered by the Data Protection Commission." },
  { name:'Ghana National AI Policy', country:'Ghana', region:'Africa', year:2023, status:'enacted', themes:['AI strategy','Ethics','Inclusive AI'], url:'https://moc.gov.gh/', desc:'Policy framework for inclusive, ethical AI development in Ghana.' },
  { name:'South Africa POPIA', country:'South Africa', region:'Africa', year:2020, status:'enacted', themes:['Data protection','Information Officer','Special data'], url:'https://popia.co.za/', desc:"South Africa's comprehensive data protection law enforced by the Information Regulator." },
  { name:'SA AI Governance Framework (Draft)', country:'South Africa', region:'Africa', year:2024, status:'draft', themes:['AI regulation','Transparency','Bias','Ethics'], url:'https://www.dsit.gov.za/', desc:'Draft framework for responsible AI development in South Africa, open for public comment.' },
  { name:'Egypt Personal Data Protection Law', country:'Egypt', region:'Africa', year:2020, status:'enacted', themes:['Data protection','Privacy','Sensitive data'], url:'https://www.mcit.gov.eg/', desc:"Egypt's comprehensive personal data protection law." },
  { name:'Morocco Data Protection Law 09-08', country:'Morocco', region:'Africa', year:2009, status:'enacted', themes:['Data protection','CNDP','Registration'], url:'https://www.cndp.ma/', desc:"Morocco's data protection framework administered by the CNDP." },
  { name:'Uganda DPDPA', country:'Uganda', region:'Africa', year:2019, status:'enacted', themes:['Data protection','Registration','Rights'], url:'https://www.pdpo.go.ug/', desc:"Uganda's Data Protection and Privacy Act establishing the PDPO." },
  { name:'Mauritius Data Protection Act', country:'Mauritius', region:'Africa', year:2017, status:'enacted', themes:['Data protection','Privacy','GDPR-aligned'], url:'https://dataprotection.govmu.org/', desc:'GDPR-aligned framework. Mauritius published Africa\'s first national AI strategy in 2018.' },
  { name:'NITDA AI Policy Framework', country:'Nigeria', region:'Africa', year:2023, status:'guidelines', themes:['AI governance','Transparency','Fairness'], url:'https://nitda.gov.ng/', desc:"Nigeria's AI policy framework establishing principles for trustworthy AI." },
  { name:'SADC AI Framework', country:'Regional (SADC)', region:'Africa', year:2023, status:'guidelines', themes:['Regional AI','Health AI','Human oversight','Southern Africa'], url:'https://www.sadc.int/', desc:'Regional framework for responsible AI adoption across SADC member states.' },
  { name:'ISO/IEC 42001:2023', country:'International', region:'International', year:2023, status:'standard', themes:['AI management','Risk','Governance','Certification'], url:'https://www.iso.org/standard/81230.html', desc:'The international standard for AI Management Systems. Increasingly required by enterprise procurement.' },
  { name:'ISO/IEC 23894:2023', country:'International', region:'International', year:2023, status:'standard', themes:['AI risk','Risk management'], url:'https://www.iso.org/standard/77304.html', desc:'Guidance on AI risk management — systematic approach to identifying, assessing, and treating AI-related risks.' },
  { name:'ISO/IEC 24028:2020', country:'International', region:'International', year:2020, status:'standard', themes:['AI trustworthiness','Bias','Robustness'], url:'https://www.iso.org/standard/77608.html', desc:'Overview of trustworthiness in AI, covering bias, robustness, privacy, security, and transparency.' },
  { name:'NIST AI Risk Management Framework', country:'International', region:'International', year:2023, status:'standard', themes:['AI risk','GOVERN','MAP','MEASURE','MANAGE'], url:'https://www.nist.gov/system/files/documents/2023/01/26/AI%20RMF%201.0.pdf', desc:'NIST AI RMF 1.0 — the foundational US AI risk management framework, referenced globally.' },
  { name:'NIST AI 100-2', country:'International', region:'International', year:2024, status:'standard', themes:['Adversarial ML','Security','Robustness'], url:'https://airc.nist.gov/Docs/2', desc:'NIST guidance on adversarial machine learning threats and mitigations.' },
  { name:'Canada AIDA', country:'Canada', region:'Americas', year:2022, status:'draft', themes:['AI regulation','High-impact AI','Accountability'], url:'https://ised-isde.canada.ca/site/innovation-better-canada/en/artificial-intelligence-and-data-act', desc:"Canada's proposed AI legislation establishing obligations for high-impact AI systems." },
  { name:'China PIPL', country:'China', region:'Asia-Pacific', year:2021, status:'enacted', themes:['Data protection','Automated decisions','Consent'], url:'https://www.npc.gov.cn/', desc:"China's Personal Information Protection Law with provisions on automated decision-making." },
  { name:'China Generative AI Regulations', country:'China', region:'Asia-Pacific', year:2023, status:'enacted', themes:['Generative AI','Content labelling','AIGC'], url:'https://www.cac.gov.cn/', desc:"World's first binding law specifically targeting generative AI services." },
  { name:'India DPDP Act', country:'India', region:'Asia-Pacific', year:2023, status:'enacted', themes:['Data protection','Consent',"Children's data"], url:'https://meity.gov.in/', desc:"India's Digital Personal Data Protection Act." },
  { name:'Singapore AI Governance Framework', country:'Singapore', region:'Asia-Pacific', year:2020, status:'guidelines', themes:['AI governance','Transparency','Human oversight','Explainability'], url:'https://www.imda.gov.sg/resources/publications/AI-Governance-Framework', desc:"Singapore's practical, industry-focused framework for responsible AI deployment." },
  { name:'UK ICO AI Guidance', country:'United Kingdom', region:'Europe', year:2023, status:'guidelines', themes:['AI transparency','Automated decisions','UK GDPR'], url:'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/', desc:'ICO guidance on using AI in compliance with UK GDPR.' },
  { name:'NIST Privacy Framework', country:'International', region:'International', year:2020, status:'standard', themes:['Privacy','Risk','Data governance'], url:'https://www.nist.gov/privacy-framework', desc:'Voluntary tool for organisations to identify and manage privacy risk.' },
  { name:'IEEE 7000 Series', country:'International', region:'International', year:2021, status:'standard', themes:['Ethical AI','Values','Design'], url:'https://ethicsstandards.org/', desc:'Ethical considerations in system design — foundation for value-aligned AI engineering.' },
  { name:'Brazil AI Bill PL 2338/2023', country:'Brazil', region:'Americas', year:2023, status:'draft', themes:['AI regulation','High-risk AI','Rights'], url:'https://www25.senado.leg.br/', desc:"Brazil's comprehensive AI Bill establishing a risk-based framework." },
  { name:'UAE ADGM AI Guidance', country:'UAE', region:'Middle East', year:2023, status:'guidelines', themes:['Financial AI','FinTech','Governance'], url:'https://www.adgm.com/', desc:'Abu Dhabi Global Market guidance on responsible AI in financial services.' },
  { name:'HIPAA (AI applications)', country:'United States', region:'Americas', year:1996, status:'enacted', themes:['Health data','Privacy','Security','US'], url:'https://www.hhs.gov/hipaa/index.html', desc:'US health data privacy law with significant implications for health AI.' },
  { name:'South Korea PIPA', country:'South Korea', region:'Asia-Pacific', year:2020, status:'enacted', themes:['Data protection','AI transparency','Automated decisions'], url:'https://www.pipc.go.kr/', desc:"South Korea's Personal Information Protection Act with provisions on automated decision-making." },
  { name:'ISO/IEC 24668:2022', country:'International', region:'International', year:2022, status:'standard', themes:['AI process management','Big data','Governance'], url:'https://www.iso.org/standard/79337.html', desc:'Process management framework for big data and AI systems.' },
];

export const INTEL_ITEMS = [
  { type:'enacted', region:'Europe', briefing:'The EU AI Act entered into force in August 2024 and is phasing in obligations across 2025–2026. Prohibited practices apply from February 2025. High-risk AI obligations — including for health and finance AI — apply from August 2026. African AI builders targeting European markets must plan compliance now.', date:'Aug 2024', country:'European Union', sources:[{ title:'EU AI Act official text', url:'https://artificialintelligenceact.eu/' },{ title:'EU AI Act timeline', url:'https://artificialintelligenceact.eu/the-act/' }] },
  { type:'enacted', region:'Africa', briefing:"Nigeria's Data Protection Act 2023 is now fully operational with the NDPC actively enforcing compliance. AI companies processing Nigerian user data — whether domestic or offshore — must register and comply.", date:'Jan 2024', country:'Nigeria', sources:[{ title:'NDPC official guidance', url:'https://ndpc.gov.ng/' }] },
  { type:'draft', region:'Africa', briefing:"South Africa's dedicated AI Governance Framework is in public consultation. The draft introduces transparency obligations, human oversight requirements for high-impact AI, and algorithmic impact assessments. Expected to be finalised in 2025.", date:'Mar 2024', country:'South Africa', sources:[{ title:'DSIT AI Governance Framework', url:'https://www.dsit.gov.za/' }] },
  { type:'enacted', region:'Africa', briefing:"Rwanda's National AI Policy 2023 positions the country as a leading AI governance jurisdiction on the continent. With the DPL already in force, Rwanda now has both data protection and AI-specific governance — one of the most complete regulatory frameworks in Africa.", date:'Nov 2023', country:'Rwanda', sources:[{ title:'Rwanda MINICT', url:'https://www.minict.gov.rw/' }] },
  { type:'alert', region:'Europe', briefing:"The EU AI Act's GPAI (General Purpose AI) model obligations apply from August 2025. Any organisation deploying foundation models or LLMs in Europe — including through APIs — must comply with new transparency, copyright, and systemic risk provisions.", date:'Jun 2024', country:'European Union', sources:[{ title:'GPAI obligations guidance', url:'https://artificialintelligenceact.eu/the-act/' }] },
  { type:'standard', region:'International', briefing:'ISO/IEC 42001:2023 is rapidly becoming the de facto AI governance certification for enterprise procurement. Large organisations in regulated sectors are requiring ISO 42001 certification from AI vendors. African AI builders who achieve this gain significant competitive advantage in B2B markets.', date:'Dec 2023', country:'International', sources:[{ title:'ISO 42001 official', url:'https://www.iso.org/standard/81230.html' }] },
  { type:'draft', region:'Americas', briefing:"Canada's Artificial Intelligence and Data Act (AIDA) continues through parliamentary process. If enacted, it will be the first comprehensive AI law in the Americas, establishing mandatory requirements for high-impact AI systems.", date:'Apr 2024', country:'Canada', sources:[{ title:'ISED AIDA overview', url:'https://ised-isde.canada.ca/site/innovation-better-canada/en/artificial-intelligence-and-data-act' }] },
  { type:'enacted', region:'Asia-Pacific', briefing:"China's Generative AI Regulations came into force in 2023. Requirements include security assessments before launch, content labelling, and registration. This is the world's first binding law specifically targeting generative AI.", date:'Aug 2023', country:'China', sources:[{ title:'CAC Generative AI Regulations', url:'https://www.cac.gov.cn/' }] },
];
