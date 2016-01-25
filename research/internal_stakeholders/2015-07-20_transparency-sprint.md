## Background

In July 2015, 18F held a 'transparency sprint' to work on and think about how better to structure internal mechanisms to support data-driven decision-making, and how best to share that information. To support this, we did user interviews with internal staff. Note: this research was focused on internal stakeholders and does not reflect potential needs of external dashboard users. This information was originally shared as an [internal google doc](https://docs.google.com/document/d/1dno2gtYtsfe-DOlHOAfEHcTM8ePGmnzAW6CQIc1AICw/edit#heading=h.6q1xk43scllq). Detailed summary of all transparency sprint assets [here](https://docs.google.com/document/d/1Aoj0G-gYfwVC_eHbeM8dY2Xsv00fPAXu5JfrEYHZek8/edit#). Wireframes that provided a potential solution to some of the issues raised [here](https://github.com/18F/team-api.18f.gov/issues/37).

## Methodology

We conducted eight 30-minute interviews over July 20-23 with the following types of participants:

Position | #
--- | ---
Staff Managers | 4
Operations | 2
Product Manager | 1
Talent | 1
*Total Interviews* | *8*

## Summary

**Improve Project Views**
- Projected Staff Allocation: Perhaps the single biggest insight from the study is that users want to see what people are working on, what their availability is and what project needs there are. Basically, resourcing breaks down into three components:
  - 1) projected staffing needs for each project and across all projects (i.e. what slots are there);
  - 2) projected staff allocations (i.e. who’s filling which slots and how much); and
  - 3) actual hours spent by staff on projects
- Project financials: Users need to see each project’s burn, both to date based on hours reported in Tock and infrastructure costs and projected into the future based on projected staffing.
- Project status: Project pages need to give a better sense of the project status beyond simply Discovery / Alpha / Beta. People need to have a more accurate sense of what’s actually going on with a project, and so the page could include things like:
  - Notable milestones
  - Individual accolades or high-fives for team members
- Project meta-data: In addition to repos, production URLs, and team members, project pages should also include contact information for product owners within the partner agency, usage analytics, IAAs and other documents, agency information
- Improved project list: There needs to be a standardized and unified projects list that is consistent between Tock, project dashboard, and accounting tools
- Upcoming Projects: The project list should include upcoming projects in the pipeline in order to see future staffing needs

**Improve Staff Views**
- Staff availability: Users need a view into staff availability projected into the future, both on an individual level and at the team level.
- What staff are working on: Users want to see what staff are working on (so how they report their hours in Tock), but are not interested in a billable / non-billable breakdown on an individual staff level.
- Staff skills and interests: Managers currently track staff interests and skills in various make-shift systems, and there’s a desire to have these visible in a more unified and public way.
- Upcoming Staff: In addition to current staff projections, users need to see projected allocations and availability for upcoming staff members. This data currently lives in a talent pipeline Google spreadsheet.

**Partner Agency Views**
- History of agency engagement: Users want to see the extent and history of 18F’s engagement with partner agencies, including all of the projects we’ve done or have scheduled.

## Raw notes (transcribed from post-its)

**Projected Staff Availability/Utilization**
- PM: Needs to know upcoming availability of those not on their projects
- See staff availability (Eng, Prod Consult Mgr)
- When some one will roll off a project (Prod Mgr)

**Need to see staff actual hours (against projected)**
- See staff time allocation (Eng Magr)
- See actual vs. projected time spent (Magr)
- Compare what people bill vs what was estimated
- Warns of labeling time as “billable”...maybe internal vs. external (Magr)
- Need to track the granular level of time billing, but also rolled up into totals (IAAs)
- See project priority (Eng, Consult Mgr)

**Need to See Staff Skills and Interests**
- See staff skills (Eng Mgr, Talent, Ops)
- Need to know what skills people have @18F
- See staff skills of candidates (Talent)
- Staff interests (Prod)
- Staff GS Level and burndown rates
- Employee status: Pre, now, post.
- Staff Allocation and Gaps (Talent)

**Need to See Project Staff Needs**
- Staff need to see what other opportunities there are
- Projects identify staffing needs
- Need to know the upcoming projects to plan accordingly

**Need to See Projects Tied to Agencies**
- Needs to be able to see what each business line is doing in agencies (Ops)
- List project partner contact information
- List all projects for a partner
- Thinks of relationship with agencies in terms of Task Orders (Ops)
- See past partner experiences (prod)
- Provide partner background information

**Need to See Project Financial Status**
- Track Billing rates by time period
- Where are projects again the burn rate (mnger)
- Total dollar amount
- Burn rate (consulting)
- Funds remaining (consulting)
- Need to know who much of an IAA is left (Ops)
- Leads see how much individual staff costs on projects
- See project budget/burn / end date (eng mngr)
- Need to know infrastructure costs (PM)
- Be able to handle multiple billing codes/projects
- See project expiration and status (ops)
- Information to help budget for next year (Product)
- Funding objects
  - Type
  - Expiration
  - amount
  - agency
  - constraints
- Budget Objects
  - Total
  - Burned
  - Hrs Left
  - Savings left (Prod Mngr)
- See burn down (Prod)
- Needs to know information about projects (Ops)
  - line of bis
  - PM
  - Funding
  - D….ings
  - Priorities

**See Contact Details**
- IAA handing (Ops)
- Projects can have multiple lines of business
- IAAS live in opportunity tracker before Josh’s spreadsheet
- Stracker status of IAAs (ops)

**Standardize Unify Project and client structure and list**
- Definitive list of all projects
- Which Projects are billable
- Clean project taxonomy
- Show non-billable projects
- Which clients
- # of projects

**Need to see basic Project Information and Metrics (Delivery)**
- Uses the dashboard to link projects that aren’t public yet
- Uses dashboard Beta/Alpha Descriptions
- Project Documents (IAAs, etc)
- Would like to see some traffic analytics on the dashboard
- Wants to see projects milestone, accolades, nice notes (mgr)
- Ability to see connection and patters on projects for watchpoints (consulting)
- Link to project repos
- List projects people on 18F side
- Consulting or not,
- Tock views
- Project status
- More accurate status labels
- Project status tracks progress from lead to launch and close.
