
# Secure Entry 🎟️

### QR-Based Event Registration, Ticket Generation & Validation System

Secure Entry is a full-stack web application designed to simplify event registration, ticket generation, and entry validation using unique QR codes.

The platform allows event organizers to create events, design custom registration forms, accept online payments, issue digital tickets, and validate attendees through a web-based QR scanner.

**Built and deployed for real college events, including workshops, hackathons, and festivals.**

🌐 **[Live Application](https://secure-entry.netlify.app)**  
💻 **[GitHub Repository](https://github.com/nihal-patidar/secure-entry)**

---

## 1. Problem Statement

Traditional event registration and entry management often rely on:

- Paper-based tickets and manual verification
- Time-consuming attendee registration
- Manual tracking of event participants
- Expensive biometric devices for identity verification
- Difficulties managing paid registrations

**Secure Entry addresses these challenges** through a centralized digital platform that handles registration, payment, ticket generation, and QR-based entry validation.

The goal was to create a practical, affordable, and reusable solution for different types of college events.

---

## 2. Key Features

### Event & Service Management
- Create and manage events or services
- Configure registration requirements
- Generate shareable registration links
- Support multiple event types

### Dynamic Form Builder
- Create customized registration forms
- Collect event-specific attendee information
- Reuse the registration workflow across different events
- Eliminate the need for separate external forms

### Online Payment Integration
- Support free and paid registrations
- Integrate Razorpay for online payments
- Connect successful registrations with ticket generation

### QR-Based Ticket Generation
- Generate digital tickets for registered attendees
- Associate unique QR codes with tickets
- Provide attendees with digital entry passes

### Ticket Validation
- Scan QR codes through a web-based scanner
- Validate tickets during event entry
- Prevent reuse of tickets after successful validation
- Simplify entry management without dedicated biometric hardware

---

## 3. Technology Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React.js, Next.js |
| Backend | Node.js |
| Database | MongoDB |
| Payments | Razorpay |
| Ticketing | QR Code Libraries |
| Deployment | Netlify, DigitalOcean |
| Version Control | Git, GitHub |

---

## 4. Application Workflow

The complete registration and entry process:

```text
Event Organizer
      |
      v
Create Account
      |
      v
Create Event / Service
      |
      v
Build Custom Registration Form
      |
      v
Share Registration Link
      |
      v
Attendee Opens Registration Form
      |
      v
Submit Registration Details
      |
      v
Free or Paid Registration
      |
      +------ Paid ------> Razorpay Payment
      |                         |
      +-------------------------+
      |
      v
Generate Digital Ticket
      |
      v
Assign Unique QR Code
      |
      v
Attendee Arrives at Event
      |
      v
Scan QR Code
      |
      v
Validate Ticket
      |
      +------ Invalid / Used --> Reject Entry
      |
      v
Approve Entry
      |
      v
Mark Ticket as Used
```

---

## 5. System Architecture

Secure Entry follows a web-based client-server architecture.

```text
                 USERS
                   |
          +--------+--------+
          |                 |
     Organizers         Attendees
          |                 |
          +--------+--------+
                   |
                   v
           Frontend Application
            React / Next.js
                   |
                   v
             Backend APIs
                Node.js
                   |
          +--------+--------+
          |                 |
          v                 v
       MongoDB         Razorpay API
          |
          v
   Registration & Ticket Data
          |
          v
     QR Validation Flow
```

### Main Components

**Frontend**
- Event and service management interfaces
- Dynamic registration forms
- Ticket display
- QR scanning interface

**Backend**
- Event and registration processing
- Payment integration
- Ticket generation and validation logic
- Database interactions

**Database**
- User and event information
- Form and registration data
- Ticket records and validation status

---

## 6. Real-World Usage

Secure Entry was developed during the sixth and seventh semesters of my B.Tech program.

The application was used across multiple college events, including:

- Technical workshops
- Hackathons
- College festivals
- Holi celebrations
- Paid event registrations

### Project Highlights

- **6–7 months** of development and improvements
- **8-member team** led during development
- **Multiple real events** supported
- **Paid registration workflows** used in actual events
- **DigitalOcean deployment** for approximately one month
- **No reported application failures** during event-day operations

The project provided practical experience in delivering a working application for real users rather than building only a demonstration project.

---

## 7. My Role & Contributions

**Role: Project Lead & Full-Stack Developer**

I initiated the project and led its development with a team of seven junior students.

### Technical Contributions

- Designed and developed the core application
- Implemented the dynamic form builder
- Worked on QR-based ticket generation and validation
- Integrated event registration workflows
- Worked with React, Next.js, Node.js, and MongoDB
- Deployed the application to a DigitalOcean server
- Supported the system during live college events

### Team Leadership

- Led an eight-member development team
- Mentored seven junior students in frontend and backend fundamentals
- Delegated UI and interactivity improvements
- Coordinated integration of team contributions
- Collaborated on improvements based on real event requirements

This experience helped me develop both technical problem-solving and team coordination skills.

---

## 8. Engineering Challenges

### Dynamic Registration Forms

**Challenge:** Different events required different attendee information.

**Approach:** Developed a configurable form builder so organizers could create event-specific registration forms without modifying application code for every event.

### Ticket Reuse Prevention

**Challenge:** A digital ticket should not allow repeated entry after successful validation.

**Approach:** Implemented a QR-based validation workflow that checks ticket status and marks tickets as used after successful entry.

### Supporting Different Events

**Challenge:** The application needed to support workshops, festivals, and other events with different registration requirements.

**Approach:** Built reusable event creation, registration, and ticketing workflows.

### Real-World Deployment

**Challenge:** The application needed to be accessible and operational during actual events.

**Approach:** Deployed the project to a remote DigitalOcean server and used it during live event operations.

---

## 9. Software Development Lifecycle

The project provided hands-on exposure to several stages of the software development lifecycle.

| Stage | Activities |
|-------|------------|
| Requirement Analysis | Identified registration and entry-management problems |
| Planning | Defined event, registration, payment, and validation workflows |
| Design | Planned application components and data flow |
| Development | Implemented frontend, backend, and database features |
| Integration | Combined team contributions and payment functionality |
| Testing | Verified workflows before and during events |
| Deployment | Hosted the application using cloud infrastructure |
| Maintenance | Improved the application based on event requirements |

The project was developed in a student-led environment rather than through a formal corporate SDLC process.

---

## 10. Future Improvements

Potential engineering improvements include:

- [ ] Add automated unit and integration tests
- [ ] Document REST APIs using OpenAPI / Swagger
- [ ] Improve database indexing and query performance
- [ ] Add structured logging and monitoring
- [ ] Implement CI/CD pipelines
- [ ] Add role-based access control where needed
- [ ] Improve validation concurrency handling
- [ ] Add event analytics and reporting dashboards
- [ ] Document HLD and LLD diagrams
- [ ] Conduct load and performance testing

---

## 11. Project Links

**Live Application:**  
https://secure-entry.netlify.app

**Source Code:**  
https://github.com/nihal-patidar/secure-entry

---

## 12. Author

**Nihal Patidar**  
B.Tech — Information Technology  
Jabalpur Engineering College, Jabalpur

**Role:** Project Lead & Full-Stack Developer

[GitHub](https://github.com/nihal-patidar)

---

## 13. Acknowledgements

Thanks to the seven junior developers who contributed to improving the application's user interface and interactivity, and to the college event organizers who provided opportunities to use the platform in real-world scenarios.

---

**Secure Entry — Making event registration and entry validation simpler, faster, and more accessible.**
