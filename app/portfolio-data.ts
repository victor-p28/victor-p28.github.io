export const profile = {
  name: "Victor Sorgi Pedroso",
  intro:
    "I'm a robotics graduate student at Georgia Tech with a background in physics and astronomy from Emory.",
  email: "vpedroso3@gatech.edu",
  linkedin: "https://www.linkedin.com/in/victorsorgipedroso",
  github: "https://github.com/victor-p28",
};

export const availability = {
  status: "Graduating May 2027",
  detail:
    "Looking for full-time roles in autonomous vehicles and robotics starting mid-2027.",
  location: "Atlanta, GA · open to relocation",
};

export const lastUpdated = "September 2026";

export const education = [
  {
    school: "Georgia Institute of Technology",
    degree: "M.S. Robotics · GPA 3.75/4.0",
    date: "Expected May 2027",
  },
  {
    school: "Emory University",
    degree: "B.S. Physics & Astronomy · GPA 3.61/4.0",
    date: "May 2025",
  },
];

export type CaseStudy = {
  slug: string;
  type: string;
  title: string;
  shortTitle: string;
  status: string;
  period: string;
  organization: string;
  summary: string;
  technologies: string[];
  highlight?: { label: string; value: string; note: string };
  sections: { title: string; paragraphs: string[]; bullets?: string[] }[];
  metrics?: { label: string; value: string; width: string }[];
  media?: { src: string; alt: string; caption: string; card?: boolean }[];
  pdfHref?: string;
  pdfLabel?: string;
  repoHref?: string;
};

export type Experience = {
  organization: string;
  role: string;
  dates: string;
  location: string;
  summary: string;
  focus: string[];
  detail?: string;
};

export const selectedWork: CaseStudy[] = [
  {
    slug: "nonlinear-filtering-ballistic-reentry",
    type: "Course project",
    title: "Comparative Analysis of Nonlinear Filtering Techniques for Ballistic Reentry Vehicle Tracking",
    shortTitle: "Ballistic Reentry Filtering",
    status: "Completed",
    period: "Spring 2026",
    organization: "AE 6505 Kalman Filtering · Georgia Tech",
    summary:
      "I compared EKF, UKF, and particle-filter estimators for a ballistic reentry vehicle with nonlinear drag, heat-shield ablation, stochastic wind, and measurements from two ground-based radars.",
    technologies: ["MATLAB", "EKF", "UKF", "Particle filter", "Sensor fusion", "Nonlinear estimation"],
    pdfHref: "/Victor_Pedroso_Ballistic_Reentry_Filtering.pdf",
    pdfLabel: "Read the project paper",
    repoHref: "https://github.com/victor-p28/Ballistic-Reentry-Filter-Comparison",
    highlight: {
      label: "UKF downrange RMSE",
      value: "20.0 m",
      note: "The UKF matched the 19.6 m particle-filter result using 10 sigma points instead of 5000 particles; the EKF reached 1080.9 m",
    },
    media: [
      {
        src: "/media/nonlinear-filtering-ballistic-reentry/ekf-beta.png",
        alt: "Ballistic coefficient against time. True beta decays from 500 to 443 kg per square metre while the EKF estimate stays a flat dashed line at 446.",
        caption:
          "The EKF's ballistic-coefficient estimate flatlines within seconds while the truth decays with heat-shield ablation. Its Kalman gain for β collapses early, so the filter stops learning the one parameter that governs the drag it is trying to track.",
        card: true,
      },
      {
        src: "/media/nonlinear-filtering-ballistic-reentry/ukf-beta.png",
        alt: "Ballistic coefficient against time. The UKF estimate oscillates between 420 and 515 for the first 25 seconds, then settles near 480 while true beta decays to 443.",
        caption:
          "The UKF oscillates hard while it identifies β from noisy radar, then converges and holds near the truth. It recovers the parameter the EKF froze — though conservative process-noise tuning still keeps it from following the continued decay.",
      },
      {
        src: "/media/nonlinear-filtering-ballistic-reentry/ekf-position-error.png",
        alt: "Two stacked plots of EKF position error. Downrange error climbs from near zero to about 1.4 km by 45 seconds; altitude error falls to about negative 0.65 km.",
        caption:
          "EKF downrange error grows past 1.3 km as the vehicle reaches denser atmosphere and the drag nonlinearity sharpens — precisely the regime where first-order linearization stops holding.",
      },
      {
        src: "/media/nonlinear-filtering-ballistic-reentry/ukf-position-error.png",
        alt: "Two stacked plots of UKF position error. Downrange error stays bounded between roughly negative 0.06 and 0.05 km for the whole flight; altitude error stays within about 0.13 km.",
        caption:
          "Same trajectory, same measurements, UKF instead of EKF — error stays bounded for the entire flight. Check the vertical axis: this plot spans 0.3 km where the EKF plot above spans 1.5 km.",
      },
      {
        src: "/media/nonlinear-filtering-ballistic-reentry/ekf-trajectory.png",
        alt: "Altitude against downrange distance, showing the EKF estimated trajectory overlaid on the truth trajectory. The two curves are visually indistinguishable.",
        caption:
          "Every filter here produces a trajectory overlay that looks correct, including the EKF that is off by more than a kilometre. That is why this comparison is made on error plots and RMSE rather than on trajectory overlays.",
      },
    ],
    sections: [
      {
        title: "Estimation Problem",
        paragraphs: [
          "I built a simulated ballistic reentry scenario and estimated the vehicle's horizontal position, altitude, velocity, and ballistic coefficient from noisy radar measurements. The estimation problem becomes more difficult as the vehicle enters denser atmosphere and the nonlinear drag force increases.",
          "I extended the standard reentry problem with a time-varying ballistic coefficient driven by heat-shield ablation and stochastic wind modeled as a first-order Gauss-Markov process.",
        ],
      },
      {
        title: "Simulation and Measurements",
        paragraphs: [
          "I generated the truth trajectory with gravity, exponential atmospheric density, nonlinear aerodynamic drag, ablation, and wind disturbances. The vehicle entered at an altitude of 90 km and a speed of 6000 m/s, and the simulation used a 0.1 s integration timestep.",
          "Two ground-based radars measured range and elevation angle. I fused the four measurements at each timestep to improve observability of the five estimated states, including the unknown ballistic coefficient, β.",
        ],
        bullets: [
          "Seven-state truth model with position, velocity, β, and two wind states",
          "Five-state filter model with β estimated jointly with vehicle motion",
          "Dual-radar range and elevation measurements with Gaussian noise",
          "Intentional model mismatch because the filters did not know the ablation or wind equations",
        ],
      },
      {
        title: "Filter Implementations",
        paragraphs: [
          "I implemented all three filters in MATLAB and propagated the nonlinear dynamics with fourth-order Runge-Kutta integration. The EKF used analytic dynamics and measurement Jacobians that I derived for the drag and radar models.",
          "The UKF propagated 10 sigma points through the full nonlinear system. The particle filter used 5000 particles with importance weighting, resampling, and process noise to represent the posterior distribution without a Gaussian assumption.",
        ],
        bullets: [
          "EKF with first-order linearization and analytic F and H Jacobians",
          "UKF with 2n sigma points for the five-state estimate",
          "Particle filter with 5000 particles and resampling",
          "Identical truth trajectory, initial covariance, and noisy measurements for all three filters",
        ],
      },
      {
        title: "Results",
        paragraphs: [
          "The EKF performed well in the upper atmosphere but degraded as drag increased. Its downrange RMSE reached 1080.9 m, and its Kalman gain for β collapsed early, leaving the ballistic-coefficient estimate nearly fixed.",
          "The UKF reached 20.0 m downrange RMSE and the particle filter reached 19.6 m. Their performance was similar because the posterior remained close to Gaussian, so the particle filter's ability to represent arbitrary distributions did not provide an accuracy advantage. The UKF was the more efficient choice because it used 10 sigma points instead of 5000 particles.",
        ],
        bullets: [
          "EKF RMSE: 1080.9 m downrange and 492.6 m altitude",
          "UKF RMSE: 20.0 m downrange and 38.6 m altitude",
          "Particle-filter RMSE: 19.6 m downrange and 42.1 m altitude",
          "UKF produced the lowest ballistic-coefficient RMSE at 26.3 kg/m²",
        ],
      },
      {
        title: "Limitations and Future Work",
        paragraphs: [
          "The comparison used one stochastic simulation run, and all three filters struggled to follow the continued ablation-driven decrease in β after their initial convergence. The process-noise tuning was conservative, which limited how quickly the parameter estimate could change.",
          "Future work includes adaptive process-noise tuning, Monte Carlo evaluation with covariance-consistency checks, simulated radar outages, a higher-fidelity atmospheric-density model, and extension to three-dimensional motion.",
        ],
      },
    ],
  },
  {
    slug: "autonomous-mobile-robot",
    type: "Independent robotics project",
    title: "Autonomous Mobile Robot Simulation & State Estimation",
    shortTitle: "Autonomous Mobile Robot",
    status: "In progress",
    period: "2026 to Present",
    organization: "Self-directed engineering",
    summary:
      "I am developing a mobile robot simulation and state estimation stack in Python and C++. The current system includes differential-drive dynamics, PID control, sensor noise, Monte Carlo testing, and an Extended Kalman Filter.",
    technologies: ["Python", "C++", "Eigen", "CMake", "ROS 2", "EKF", "PID control"],
    repoHref: "https://github.com/victor-p28/Autonomous-Mobile-Robot",
    metrics: [
      { label: "Raw", value: "0.723", width: "100%" },
      { label: "Low-pass", value: "0.456", width: "63%" },
      { label: "EKF", value: "0.289", width: "40%" },
    ],
    highlight: {
      label: "Best Monte Carlo result",
      value: "0.289 RMS error",
      note: "Extended Kalman Filter position estimate, compared with 0.723 for raw measurements",
    },
    sections: [
      {
        title: "Project Scope",
        paragraphs: [
          "I am building this autonomous mobile robot software stack from first principles. The work began with nonlinear motion and feedback control, then added noisy sensing, state estimation, testing, and a matching C++ implementation. The next stages use ROS 2 and physical hardware.",
        ],
      },
      {
        title: "Simulation and Control",
        paragraphs: [
          "I model a two-dimensional differential-drive robot with unicycle kinematics. I use separate PID controllers for heading and linear velocity, with a heading gate that prevents forward motion when the orientation error is too large.",
        ],
        bullets: [
          "Two-dimensional differential-drive simulation",
          "Nonlinear unicycle motion model",
          "Dual PID control for heading and linear velocity",
          "Wheel-slip, process-noise, and position-measurement models",
        ],
      },
      {
        title: "State Estimation and Results",
        paragraphs: [
          "I compared raw measurements, a low-pass filter, and an Extended Kalman Filter over repeated randomized Monte Carlo trials. RMS position error improved from 0.723 for raw measurements to 0.456 for the low-pass filter and 0.289 for the EKF.",
        ],
      },
      {
        title: "Cross-Implementation Validation",
        paragraphs: [
          "Once the Python version worked, I reimplemented the Extended Kalman Filter in C++ with Eigen and CMake and checked it numerically against the Python reference rather than assuming the port was correct.",
          "Writing the same estimator twice and requiring the two to agree catches the class of bug a single implementation hides: a filter that is internally consistent, produces plausible-looking output, and is still wrong. The agreement between them is what makes the 0.289 result a property of the algorithm rather than of one implementation.",
        ],
      },
      {
        title: "Next Steps",
        paragraphs: [
          "Next I will move the project into a ROS 2 Jazzy and colcon workspace. The planned sequence is a simulated robot node, separate controller and EKF nodes, Gazebo integration, and deployment to a physical rover.",
        ],
      },
    ],
  },
  {
    slug: "turtlebot3-autonomy",
    type: "Course project",
    title: "TurtleBot3 Autonomy and Vision-Guided Maze Navigation",
    shortTitle: "TurtleBot3 Autonomy",
    status: "Completed",
    period: "Fall 2025",
    organization: "Intro to Robotics Research · Georgia Tech",
    summary:
      "Ella Lawrence and I developed a sequence of TurtleBot3 autonomy projects that culminated in a robot that navigated a maze and used a trained convolutional neural network to interpret direction signs.",
    technologies: ["ROS 2", "Python", "OpenCV", "LIDAR", "Nav2", "SLAM", "TensorFlow/Keras", "TurtleBot3"],
    repoHref: "https://github.com/victor-p28/Intro-To-Robotics-Research",
    highlight: {
      label: "Final system",
      value: "Vision-guided maze navigation",
      note: "Integrated mapping, localization, planning, feedback control, and CNN sign classification on a TurtleBot3",
    },
    sections: [
      {
        title: "Project Progression",
        paragraphs: [
          "This team project developed one autonomy capability at a time across the semester. We began with image-based object detection, then built closed-loop object chasing, waypoint navigation, SLAM, autonomous navigation, sign classification, and a final integrated maze solver.",
          "The course provided the ROS package scaffolding, Gazebo maze environment, and labeled sign datasets. Ella and I wrote the node logic, controllers, training pipeline, and system integration together. We often developed pieces separately, then tested, debugged, and revised the full system as a team.",
        ],
      },
      {
        title: "Perception and Feedback Control",
        paragraphs: [
          "For object chasing, we detected a colored object through HSV thresholding in OpenCV and converted its image position into a camera bearing. We matched that bearing to the corresponding LIDAR measurements to estimate range, then used separate proportional-derivative loops for distance and heading control.",
        ],
        bullets: [
          "Fused camera bearing with LIDAR range measurements",
          "Ran the control loop at approximately 20 Hz",
          "Used threshold bands to prevent continuous correction near the target",
          "Separated detection, range estimation, control, and debugging into ROS 2 nodes",
        ],
      },
      {
        title: "Navigation and Mapping",
        paragraphs: [
          "We next implemented odometry-based waypoint navigation with reactive LIDAR obstacle avoidance. The following stage replaced dead reckoning with occupancy-grid maps created through SLAM and used AMCL and Nav2 to localize, plan, and follow collision-free paths.",
          "We developed and tested the navigation stack in Gazebo and on a physical TurtleBot3 Burger. The project includes separate maps of the simulated and physical maze environments.",
        ],
      },
      {
        title: "Sign Classification",
        paragraphs: [
          "We trained a Keras convolutional neural network to classify direction signs from camera images. The training pipeline loaded the labeled image data, split it into training and evaluation sets, and saved the trained model for use by the final ROS 2 package.",
        ],
        bullets: [
          "Keras Sequential model with convolution, pooling, batch normalization, dense, and dropout layers",
          "OpenCV image processing and labeled sign datasets",
          "Saved model shared directly with the final navigation system",
        ],
      },
      {
        title: "Final Integration",
        paragraphs: [
          "The final system combined the earlier work into a vision-guided maze solver. The main ROS 2 node used the camera and trained CNN to read signs at maze junctions, selected the corresponding direction, and sent navigation goals while using the map, AMCL pose estimate, and LIDAR data to move through the environment.",
          "The project gave us experience working across perception, estimation, control, planning, machine learning, and system-level troubleshooting instead of treating each subsystem in isolation.",
        ],
      },
    ],
  },
  {
    slug: "pde-optical-flow",
    type: "Course project",
    title: "Optical Flow Estimation via Horn-Schunck and ε-Regularized PDEs",
    shortTitle: "PDE-Based Optical Flow",
    status: "Completed",
    period: "Spring 2026",
    organization: "PDEs in Image Processing and Vision · Georgia Tech",
    summary:
      "I derived and implemented standard Horn-Schunck and ε-regularized optical flow solvers, then compared their accuracy, convergence, and edge-preserving behavior on a controlled translation experiment.",
    technologies: ["Optical flow", "PDEs", "Finite differences", "Euler-Lagrange", "Horn-Schunck", "Numerical optimization"],
    pdfHref: "/Victor_Pedroso_PDE_Optical_Flow.pdf",
    pdfLabel: "Read the project report",
    highlight: {
      label: "Experimental sweep",
      value: "13 parameter settings",
      note: "Five standard Horn-Schunck configurations and eight ε-regularized configurations",
    },
    media: [
      {
        src: "/media/pde-optical-flow/horn-schunck-standard.png",
        alt: "Quiver plot of an estimated optical flow field. Red arrows point diagonally up and to the right, densest over a white square at the centre but extending well across the dark background.",
        caption:
          "Standard Horn-Schunck at λ = 0.5. The quadratic smoothness term spreads flow far into the static background, where the true motion is zero — every one of those background arrows is error.",
        card: true,
      },
      {
        src: "/media/pde-optical-flow/horn-schunck-augmented.png",
        alt: "Quiver plot of the same scene solved with epsilon regularization. Red arrows are concentrated tightly around the white square and the surrounding background is nearly empty.",
        caption:
          "ε-augmented at the same λ. Flow stays concentrated near the moving boundary and reaches roughly half the standard method's error — but takes about 370,000 iterations against 104,000. The sharper result is not the free one.",
      },
    ],
    sections: [
      {
        title: "Optical Flow Problem",
        paragraphs: [
          "I studied how to estimate pixel motion between two consecutive frames using only changes in image brightness. Because the brightness-constancy equation provides one constraint for two velocity components, I used spatial regularization to obtain a full flow field.",
          "The project compared the quadratic smoothness term in standard Horn-Schunck optical flow with an ε-regularized formulation designed to allow sharper transitions near motion boundaries.",
        ],
      },
      {
        title: "PDE Derivation",
        paragraphs: [
          "I began with an energy functional containing a brightness-constancy data term and a spatial smoothness term. I applied the Euler-Lagrange equations and introduced an artificial time variable to obtain coupled gradient-flow PDEs for the horizontal and vertical velocity fields.",
          "For the ε-regularized method, I derived the nonlinear divergence term produced by the modified smoothness penalty, including the first, second, and mixed spatial derivatives required by the numerical solver.",
        ],
      },
      {
        title: "Numerical Implementation",
        paragraphs: [
          "I discretized the spatial derivatives with centered finite differences and evolved both flow components with an explicit forward Euler scheme. The implementation used zero-padded boundary values, a time step of 0.001, and a convergence threshold of 10⁻⁶.",
        ],
        bullets: [
          "Centered first and second spatial differences",
          "Mixed derivative for the nonlinear regularization term",
          "Explicit artificial-time integration",
          "Stability and convergence analysis for both formulations",
        ],
      },
      {
        title: "Experiment and Results",
        paragraphs: [
          "I evaluated the solvers on two 100 by 100 frames containing a square translated by one pixel in both image directions. I tested five values of λ for standard Horn-Schunck and eight values of ε for the regularized method while holding λ at 0.5.",
          "The standard method spread the estimated flow farther into the background. Intermediate ε values kept the field closer to the motion boundary while retaining the correct diagonal direction. The parameter sweep also showed that a low aggregate error could be misleading when produced by an almost-zero flow field, so I evaluated the plots together with the numerical metric.",
        ],
      },
      {
        title: "Computational Tradeoffs",
        paragraphs: [
          "The ε-regularized formulation improved localization near the square boundary but required more computation. Standard configurations converged in roughly 69,000 to 188,000 iterations, while the regularized cases reached approximately 368,000 iterations at the largest ε value.",
          "The project showed that the regularized method is not automatically preferable in every setting. Its sharper motion boundaries must be weighed against slower convergence, parameter sensitivity, and the limitations of the selected error metric.",
        ],
      },
      {
        title: "Scope and Future Work",
        paragraphs: [
          "This study used a controlled single-pixel translation to isolate the effects of λ and ε. Future extensions include alternative error metrics, larger displacements, multiscale estimation, and evaluation on real image sequences.",
        ],
      },
    ],
  },
  {
    slug: "multi-drone-collision-avoidance",
    type: "Graduate research",
    title: "Control Experiments in Python and AirSim",
    shortTitle: "Control Experiments in Python and AirSim",
    status: "Concluded",
    period: "2026",
    organization: "C3U Lab · Georgia Tech",
    summary:
      "Exploratory code for quadrotor model predictive control, flight-data collection in AirSim, and data-driven feedback control. This work concluded at the code-experiment stage.",
    technologies: ["Python", "CVXPY", "NumPy", "SciPy", "AirSim", "MPC"],
    sections: [
      {
        title: "Model Predictive Control",
        paragraphs: [
          "The MPC script defines a six-state position and velocity model, a 20-step prediction horizon, and constraints on vertical input and tilt. It solves a CVXPY optimization problem and sends velocity commands to an AirSim quadrotor toward a target position.",
        ],
      },
      {
        title: "Data Collection and Feedback Control",
        paragraphs: [
          "A separate AirSim script collects vehicle states and rotor-speed-derived inputs during random velocity commands, then checks the rank of the combined data matrix.",
          "The notebook explores a semidefinite-program formulation of data-driven feedback control using simulated linear-system trajectories. It includes controller-gain and closed-loop eigenvalue calculations.",
        ],
      },
      {
        title: "Scope",
        paragraphs: [
          "The work ended with these scripts and notebook. It did not reach a multi-drone collision-avoidance system or hardware validation.",
        ],
      },
    ],
  },
  {
    slug: "interpretable-vehicle-coordination",
    type: "Robotics capstone",
    title: "Vehicle Coordination Through Interpretable Messages",
    shortTitle: "Vehicle Coordination Through Interpretable Messages",
    status: "In progress",
    period: "2026",
    organization: "Georgia Tech",
    summary:
      'Planned research on how autonomous agents can coordinate movement using a small set of messages such as “yield” or “pass left.” The initial focus is two cooperative vehicles navigating an intersection.',
    technologies: ["Multi-agent coordination", "Motion planning", "Trajectory feasibility", "Collision avoidance"],
    sections: [
      {
        title: "Proposed Approach",
        paragraphs: [
          'The proposed approach maps interpretable messages, such as “yield” or “pass left,” to motion primitives. The resulting trajectories would be evaluated for feasibility and safe separation.',
        ],
      },
      {
        title: "Initial Scope",
        paragraphs: [
          "The initial scenario involves two cooperative vehicles navigating an intersection. The research is in the planning stage; implementation and evaluation are still ahead.",
        ],
      },
    ],
  },

];

/* Kept off the main grid but still routed: the thesis is a strong methods credential that
   sits outside robotics, and the curriculum is a plan rather than a shipped result. */
export const additionalWork: CaseStudy[] = [
  {
    slug: "galaxy-effective-radius-thesis",
    type: "Undergraduate honors thesis",
    title: "Refining the Effective Radius Measure for Early-Type Galaxies Through GALFIT",
    shortTitle: "Effective Radius Measurement with GALFIT",
    status: "Completed",
    period: "Jan 2022 to May 2025",
    organization: "Dr. Merida Batiste's Lab · Emory University",
    summary:
      "A two-year parameter-estimation study. I fit multi-component models to eight galaxies under measurement noise and varying image resolution, and showed that the single-component fits in standard use overestimated the parameter by 3.7× on average.",
    technologies: ["Parameter estimation", "Model fitting", "Photometric decomposition", "GALFIT", "HST imaging", "ATLAS3D"],
    pdfHref: "/Victor_Pedroso_Emory_Thesis.pdf",
    pdfLabel: "Read the full thesis",
    highlight: {
      label: "Primary result",
      value: "3.7 ± 0.7× smaller",
      note: "Average effective radius from the multi-component models compared with the earlier single-component measurements",
    },
    sections: [
      {
        title: "Research Question",
        paragraphs: [
          "The co-evolution of supermassive black holes and their host galaxies remains an active area of research. I examined whether single-Gaussian fits for a subset of ATLAS3D early-type galaxies overestimated the effective radius, Re.",
        ],
      },
      {
        title: "Method",
        paragraphs: [
          "I modeled eight galaxies from the ATLAS3D survey with GALFIT, a two-dimensional luminosity-profile fitting tool. I compared the multi-component photometric decompositions with previously reported measurements and used higher-resolution Hubble Space Telescope imaging where available to capture faint outer light more accurately.",
        ],
        bullets: [
          "Constructed multi-component surface-brightness models for eight early-type galaxies",
          "Compared new effective radii against the ATLAS3D single-Gaussian values",
          "Inspected model residuals and galaxy-by-galaxy structural differences",
          "Considered how radius changes affect downstream stellar-velocity-dispersion measurements",
        ],
      },
      {
        title: "Findings",
        paragraphs: [
          "My analysis found that the multi-component effective radii were 3.7 ± 0.7 times smaller on average across the combined sample.",
          "The more useful result was the spread. The correction ranged from 0.4× to 10× across individual objects, which means no single global correction factor can substitute for fitting each one — a conclusion that only appears if you read the per-object residuals rather than the sample average.",
          "Image resolution turned out to be a confounding variable in its own right. HST imaging recovered faint light in the outer regions more clearly than lower-resolution surveys such as 2MASS, so part of the measured difference came from the data rather than from the model.",
        ],
      },
      {
        title: "Future Work",
        paragraphs: [
          "The thesis proposes recalculating stellar velocity dispersion for the fitted galaxies, refining the eight models further, expanding the analysis to 32 quiescent galaxies, and separating the effects of image quality from the effects of more complex fitting.",
        ],
      },
    ],
  },
  {
    slug: "autonomous-vehicle-curriculum",
    type: "Self-directed curriculum",
    title: "Self-Directed Autonomous Vehicle Engineering Curriculum",
    shortTitle: "Autonomous Vehicle Engineering Curriculum",
    status: "In progress",
    period: "23-week plan · started 2026",
    organization: "Independent study",
    summary:
      "I designed a 23-week independent curriculum covering vehicle modeling, modern C++, estimation, perception, planning, control, ROS 2, simulation, and testing through original projects.",
    technologies: ["Modern C++", "Eigen", "CMake", "Perception", "Planning", "ROS 2", "Testing"],
    repoHref: "https://github.com/victor-p28/Autonomous-Vehicles-Curriculum",
    highlight: {
      label: "Current deliverable",
      value: "Kinematic bicycle model",
      note: "Modern C++ implementation with tests, CSV output, plots, and a written results document",
    },
    sections: [
      {
        title: "Purpose",
        paragraphs: [
          "I created this curriculum to follow the project-based structure of Udacity's Self-Driving Car Engineer program using free or independently selected material. Each project is an original implementation rather than a copied course solution.",
        ],
      },
      {
        title: "Program Structure",
        paragraphs: [
          "I organized the work into four phases spanning approximately 23 weeks, coordinated with my internship, academic semester, and recruiting timeline.",
        ],
        bullets: [
          "Foundations, modern C++, Eigen, CMake, and vehicle modeling",
          "State estimation, sensor fusion, perception, and localization",
          "Path planning, trajectory generation, and feedback control",
          "ROS 2 architecture, simulation, verification, testing, and documentation",
        ],
      },
      {
        title: "Week 0 Deliverable",
        paragraphs: [
          "My first deliverable is a discrete-time kinematic bicycle model in modern C++. I define the state, acceleration and steering inputs, coordinate conventions, and assumptions before validating straight-line, constant-turn, and edge-case behavior.",
        ],
      },
      {
        title: "Deliverables",
        paragraphs: [
          "For each phase, I will produce a design document, mathematical derivation, implementation, tests, simulation scenarios, quantitative results, visualizations, a technical report, and an engineering retrospective.",
        ],
      },
    ],
  },
];

export const caseStudies = [...selectedWork, ...additionalWork];

export const thesis = additionalWork[0];
export const curriculum = additionalWork[1];

export const industryExperiences: Experience[] = [
  {
    organization: "Volvo Autonomous Solutions",
    role: "Autonomous Vehicles Intern",
    dates: "May–August 2026",
    location: "Greensboro, NC · Gothenburg, Sweden",
    summary:
      "I analyzed logs from autonomous trucks to understand why they stopped and how they behaved during stops in mining and quarry operations. I managed release notes for autonomous driving software delivered to partners and worked on making that process consistent across partners.",
    detail:
      "I helped organize how field issues were reported, prioritized, and assigned to the right teams. I also worked on an AI search agent to help the team find information across internal databases.",
    focus: [
      "AV log analysis",
      "Stop-scenario characterization",
      "Release documentation",
      "Field-issue triage",
      "AI search agent",
    ],
  },
  {
    organization: "Yamaha Motor Corporation",
    role: "Intern → Associate Product Manager",
    dates: "May 2024 to May 2026",
    location: "Kennesaw, GA",
    summary:
      "I automated the conversion of technical specification sheets from Japan into U.S. formats with Python and Excel VBA, cutting manual processing time across annual product updates. I maintained cross-team product timelines and analyzed customer purchasing patterns.",
    focus: ["Python automation", "Excel VBA", "InRiver PIM", "Product development", "Customer data analysis"],
  },
];

export const skills = [
  { category: "Programming", items: ["Python", "C++", "MATLAB"] },
  { category: "Controls & estimation", items: ["LQR", "PID", "EKF / UKF", "Particle filters", "Control barrier functions"] },
  { category: "Robotics", items: ["ROS 2", "Nav2", "SLAM", "AMCL", "Gazebo", "Motion modeling"] },
  { category: "Perception", items: ["OpenCV", "Optical flow", "LIDAR", "CNN classification"] },
  { category: "Numerical computing", items: ["NumPy", "SciPy", "CVXPY", "Eigen"] },
  { category: "Simulation & tools", items: ["AirSim", "Vicon", "CMake", "Git", "Linux"] },
];
