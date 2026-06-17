const clinicContact = "0946 539 7697 / 0917 772 2821 / 0951 433 6574";

const serviceGroups = [
  {
    category: "OB-GYN",
    doctorSpecialties: ["Obstetrician-Gynecologist", "OB-GYN Ultrasound Specialist"],
    groups: [
      { label: "Prenatal check up and family planning", items: ["IUD and implant removal/insertion", "Tubal ligation"] },
      { label: "For non-pregnant", items: ["Myoma", "Ovarian cyst", "Infertility", "PCOS", "Papsmear", "Cervical cancer screening and vaccination", "Endometrial biopsy"] }
    ]
  },
  {
    category: "Ultrasound",
    doctorSpecialties: ["OB-GYN Ultrasound Specialist", "Radiologist/Sonologist"],
    groups: [
      { label: "Basic", items: ["Transvaginal ultrasound", "Fetal aging and viability", "Nuchal translucency", "Nasal bone measurement", "Pelvic ultrasound", "Fetal biometry", "Gender determination"] },
      { label: "Advance", items: ["Biophysical profile (BPS)", "Congenital anomaly scan (CAS)", "OB doppler", "Placental doppler"] },
      { label: "For non-pregnant basic", items: ["Transvaginal ultrasound", "Transrectal ultrasound"] },
      { label: "For non-pregnant advance", items: ["Follicle monitoring", "Doppler studies", "International ovarian tumor analysis (IOTA)", "HSSG", "Saline infusion sonohysterography (SISH)", "Deep infiltrating endometriosis"] },
      { label: "Others", items: ["Whole abdomen ultrasound", "KUB/P, HBT/P ultrasound", "Chest ultrasound", "Prostate ultrasound"] }
    ]
  },
  {
    category: "Pediatrics",
    doctorSpecialties: ["General Pediatrician", "Pediatrician - Adult and Pedia Allergologist-Immunologist"],
    groups: [
      { label: "Vaccination", items: ["Sick baby check up", "Well baby check up", "Allergy skin prick test", "Immunotherapy"] }
    ]
  },
  {
    category: "Surgery",
    doctorSpecialties: ["General Surgeon"],
    groups: [
      { label: "Consultation", items: ["Mass (bukol): breast, thyroid, colon, gallstones, skin"] }
    ]
  },
  {
    category: "Internal Medicine",
    doctorSpecialties: ["Internal Medicine", "IM - Pulmonologist and Critical Care", "General Medicine / Occupational Health Physician"],
    groups: [
      { label: "Adult diseases", items: ["Hypertension", "Diabetes mellitus", "Heart disease", "Pneumonia", "UTI", "Pre-operative medical risk assessment (CP clearance)", "Fit to work medical certificate"] }
    ]
  },
  {
    category: "Aesthetic Gynecology",
    doctorSpecialties: ["Aesthetic and Functional Gynecology"],
    groups: [
      { label: "Non-surgical", items: ["Vaginal rejuvenation", "Vaginal tightening", "Vaginal whitening", "G-spot amplification", "O-shot", "Postpartum abdomen scars", "Urinary incontinence"] }
    ]
  }
];

const defaultDoctors = [
  makeDoctor("doc-obgyn", "CareLink OB-GYN Team", "Obstetrician-Gynecologist", "OG", ["Monday", "Wednesday", "Friday"], ["9:00 AM", "1:00 PM"], 8),
  makeDoctor("doc-aesthetic-gyn", "CareLink Aesthetic Gynecology Team", "Aesthetic and Functional Gynecology", "AG", ["Tuesday", "Thursday"], ["10:00 AM", "2:00 PM"], 6),
  makeDoctor("doc-ob-ultrasound", "CareLink OB-GYN Ultrasound Team", "OB-GYN Ultrasound Specialist", "US", ["Monday", "Tuesday", "Saturday"], ["8:00 AM", "11:00 AM"], 10),
  makeDoctor("doc-internal-medicine", "CareLink Internal Medicine Team", "Internal Medicine", "IM", ["Monday", "Wednesday", "Friday"], ["1:00 PM", "3:00 PM"], 8),
  makeDoctor("doc-pulmo-critical", "CareLink Pulmonology and Critical Care Team", "IM - Pulmonologist and Critical Care", "PC", ["Tuesday", "Thursday"], ["1:00 PM"], 6),
  makeDoctor("doc-general-pedia", "CareLink General Pediatrician Team", "General Pediatrician", "GP", ["Monday", "Wednesday", "Saturday"], ["10:00 AM", "2:00 PM"], 8),
  makeDoctor("doc-allergy-immunology", "CareLink Allergy and Immunology Team", "Pediatrician - Adult and Pedia Allergologist-Immunologist", "AI", ["Friday", "Saturday"], ["10:00 AM"], 6),
  makeDoctor("doc-general-surgeon", "CareLink General Surgeon Team", "General Surgeon", "GS", ["Tuesday", "Thursday"], ["9:00 AM"], 6),
  makeDoctor("doc-occupational-health", "CareLink Occupational Health Team", "General Medicine / Occupational Health Physician", "OH", ["Monday", "Wednesday", "Friday"], ["3:00 PM"], 10),
  makeDoctor("doc-pain-medicine", "CareLink Anesthesia and Pain Medicine Team", "Anesthesia and Pain Medicine", "PM", ["Thursday"], ["2:00 PM"], 6),
  makeDoctor("doc-radiology", "CareLink Radiology/Sonology Team", "Radiologist/Sonologist", "RS", ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], ["8:00 AM", "1:00 PM"], 10)
];

const storageKeys = {
  doctors: "carelinkFreshDoctors",
  appointments: "carelinkFreshAppointments"
};

const state = {
  doctors: normalizeDoctors(loadFromStorage(storageKeys.doctors, defaultDoctors)),
  appointments: loadFromStorage(storageKeys.appointments, [])
};

const doctorGrid = document.getElementById("doctorGrid");
const specialtyFilter = document.getElementById("specialtyFilter");
const servicesGrid = document.getElementById("servicesGrid");
const doctorSectionTitle = document.getElementById("doctorSectionTitle");
const doctorSelect = document.getElementById("doctorSelect");
const procedureSelect = document.getElementById("procedureSelect");
const daySelect = document.getElementById("daySelect");
const slotSelect = document.getElementById("slotSelect");
const appointmentList = document.getElementById("appointmentList");
const exportAppointmentsButton = document.getElementById("exportAppointmentsButton");
const doctorProfileForm = document.getElementById("doctorProfileForm");
const doctorProfileSelect = document.getElementById("doctorProfileSelect");
const doctorNameInput = document.getElementById("doctorNameInput");
const doctorInitialsInput = document.getElementById("doctorInitialsInput");
const doctorSpecialtyInput = document.getElementById("doctorSpecialtyInput");
const specialtyOptions = document.getElementById("specialtyOptions");
const doctorDirectoryList = document.getElementById("doctorDirectoryList");
const doctorProfileNotice = document.getElementById("doctorProfileNotice");
const resetDoctorsButton = document.getElementById("resetDoctorsButton");
const availabilityDoctorSelect = document.getElementById("availabilityDoctorSelect");
const availabilityDaySelect = document.getElementById("availabilityDaySelect");
const availabilityTimes = document.getElementById("availabilityTimes");
const dailyLimitInput = document.getElementById("dailyLimitInput");
const availabilityList = document.getElementById("availabilityList");
const availabilityNotice = document.getElementById("availabilityNotice");
const availableCount = document.getElementById("availableCount");
const doctorCardTemplate = document.getElementById("doctorCardTemplate");
const bookingNotice = document.getElementById("bookingNotice");

let selectedSpecialty = "All";

function makeDoctor(id, name, specialty, initials, days, times, dailyLimit) {
  const availability = days.flatMap((day) => times.map((time) => ({ day, time })));
  const dailyLimits = Object.fromEntries(days.map((day) => [day, dailyLimit]));
  return { id, name, initials, specialty, dailyLimits, availability };
}

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeDoctors(doctors) {
  return doctors.map((doctor) => ({
    ...doctor,
    dailyLimits: doctor.dailyLimits || {},
    availability: doctor.availability || []
  }));
}

function getAllProcedures() {
  return serviceGroups.flatMap((serviceGroup) => (
    serviceGroup.groups.flatMap((group) => (
      group.items.map((item) => ({
        category: serviceGroup.category,
        name: item
      }))
    ))
  ));
}

function getSpecialties() {
  return ["All", ...new Set(state.doctors.map((doctor) => doctor.specialty))];
}

function getMappedSpecialties(category) {
  return serviceGroups.find((group) => group.category === category)?.doctorSpecialties || null;
}

function getVisibleDoctors() {
  if (selectedSpecialty === "All") {
    return state.doctors;
  }

  const mapped = getMappedSpecialties(selectedSpecialty);
  if (mapped) {
    return state.doctors.filter((doctor) => mapped.includes(doctor.specialty));
  }

  return state.doctors.filter((doctor) => doctor.specialty === selectedSpecialty);
}

function getSelectedDoctor() {
  return state.doctors.find((doctor) => doctor.id === doctorSelect?.value) || getVisibleDoctors()[0] || state.doctors[0];
}

function getAvailabilityEditorDoctor() {
  return state.doctors.find((doctor) => doctor.id === availabilityDoctorSelect?.value) || state.doctors[0];
}

function getProfileEditorDoctor() {
  return state.doctors.find((doctor) => doctor.id === doctorProfileSelect?.value) || state.doctors[0];
}

function getDaysForDoctor(doctor) {
  return [...new Set((doctor?.availability || []).map((slot) => slot.day))];
}

function getSlotsForDoctorAndDay(doctor, day) {
  return (doctor?.availability || []).filter((slot) => slot.day === day);
}

function getDailyLimit(doctor, day) {
  const limit = Number(doctor?.dailyLimits?.[day]);
  return Number.isFinite(limit) && limit > 0 ? limit : 1;
}

function getBookedCount(doctorId, day) {
  return state.appointments.filter((appointment) => (
    appointment.doctorId === doctorId &&
    appointment.day === day &&
    appointment.status !== "declined" &&
    appointment.status !== "completed"
  )).length;
}

function getRemainingCount(doctor, day) {
  return Math.max(getDailyLimit(doctor, day) - getBookedCount(doctor.id, day), 0);
}

function renderServices() {
  if (servicesGrid) {
    servicesGrid.innerHTML = "";
    serviceGroups.forEach((serviceGroup) => {
      const card = document.createElement("article");
      const title = document.createElement("a");
      card.className = "service-card";
      title.className = "service-link";
      title.href = "#doctors";
      title.textContent = serviceGroup.category;
      title.addEventListener("click", () => showDoctorsForService(serviceGroup.category));
      card.appendChild(title);

      serviceGroup.groups.forEach((group) => {
        const label = document.createElement("h4");
        const list = document.createElement("ul");
        label.textContent = group.label;
        group.items.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.textContent = item;
          list.appendChild(listItem);
        });
        card.append(label, list);
      });

      servicesGrid.appendChild(card);
    });
  }

  if (procedureSelect) {
    procedureSelect.innerHTML = "";
    getAllProcedures().forEach((procedure) => {
      const option = document.createElement("option");
      option.value = `${procedure.category}: ${procedure.name}`;
      option.textContent = `${procedure.category} - ${procedure.name}`;
      procedureSelect.appendChild(option);
    });
  }
}

function showDoctorsForService(category) {
  selectedSpecialty = category;
  renderDoctors();
  document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSpecialtyFilter() {
  if (!specialtyFilter) {
    return;
  }

  specialtyFilter.innerHTML = "";
  [...serviceGroups.map((group) => group.category), "All"].forEach((specialty) => {
    const button = document.createElement("button");
    button.className = specialty === selectedSpecialty ? "specialty-button is-active" : "specialty-button";
    button.type = "button";
    button.textContent = specialty;
    button.addEventListener("click", () => {
      selectedSpecialty = specialty;
      renderDoctors();
    });
    specialtyFilter.appendChild(button);
  });
}

function renderDoctors() {
  renderSpecialtyFilter();

  if (doctorSectionTitle) {
    doctorSectionTitle.textContent = selectedSpecialty === "All" ? "All specialties" : selectedSpecialty;
  }

  if (doctorGrid) {
    doctorGrid.innerHTML = "";
    const visibleDoctors = getVisibleDoctors();

    if (!visibleDoctors.length) {
      doctorGrid.innerHTML = '<p class="empty-state">No doctors found for this specialty.</p>';
    }

    visibleDoctors.forEach((doctor) => {
      const days = getDaysForDoctor(doctor);
      const card = doctorCardTemplate.content.cloneNode(true);
      const availabilitySummary = days.map((day) => {
        const remaining = getRemainingCount(doctor, day);
        const limit = getDailyLimit(doctor, day);
        return `${day} ${remaining}/${limit} left`;
      });

      card.querySelector(".avatar").textContent = doctor.initials;
      card.querySelector("h3").textContent = doctor.name;
      card.querySelector(".specialty").textContent = doctor.specialty;
      card.querySelector(".doctor-meta").textContent = availabilitySummary.length ? availabilitySummary.join(" | ") : "No availability set";
      doctorGrid.appendChild(card);
    });
  }

  if (availableCount) {
    availableCount.textContent = state.doctors.reduce((total, doctor) => total + doctor.availability.length, 0);
  }

  renderDoctorDropdown();
}

function renderDoctorDropdown() {
  if (!doctorSelect) {
    return;
  }

  const visibleDoctors = getVisibleDoctors();
  doctorSelect.innerHTML = "";

  if (!visibleDoctors.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No doctors for this specialty";
    doctorSelect.appendChild(option);
    renderDayOptions();
    return;
  }

  visibleDoctors.forEach((doctor) => {
    const option = document.createElement("option");
    option.value = doctor.id;
    option.textContent = `${doctor.name} - ${doctor.specialty}`;
    doctorSelect.appendChild(option);
  });

  renderDayOptions();
}

function renderDayOptions() {
  if (!daySelect) {
    return;
  }

  const doctor = getSelectedDoctor();
  const days = getDaysForDoctor(doctor);
  daySelect.innerHTML = "";

  if (!days.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No available days";
    daySelect.appendChild(option);
    renderSlotOptions();
    return;
  }

  days.forEach((day) => {
    const remaining = getRemainingCount(doctor, day);
    const limit = getDailyLimit(doctor, day);
    const option = document.createElement("option");
    option.value = day;
    option.textContent = `${day} (${remaining}/${limit} left)`;
    option.disabled = remaining === 0;
    daySelect.appendChild(option);
  });

  const firstOpenDay = [...daySelect.options].find((option) => !option.disabled);
  if (firstOpenDay) {
    daySelect.value = firstOpenDay.value;
  }

  renderSlotOptions();
}

function renderSlotOptions() {
  if (!slotSelect || !daySelect) {
    return;
  }

  const doctor = getSelectedDoctor();
  const slots = getSlotsForDoctorAndDay(doctor, daySelect.value);
  const remaining = getRemainingCount(doctor, daySelect.value);
  slotSelect.innerHTML = "";

  if (!slots.length || remaining === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = remaining === 0 ? "Fully booked for this day" : "No available times";
    slotSelect.appendChild(option);
    return;
  }

  slots.forEach((slot) => {
    const option = document.createElement("option");
    option.value = slot.time;
    option.textContent = slot.time;
    slotSelect.appendChild(option);
  });
}

function renderAppointments() {
  if (!appointmentList) {
    return;
  }

  appointmentList.innerHTML = "";

  if (!state.appointments.length) {
    appointmentList.innerHTML = '<p class="empty-state">No appointments yet.</p>';
    return;
  }

  state.appointments.forEach((appointment) => {
    const item = document.createElement("article");
    const header = document.createElement("header");
    const details = document.createElement("div");
    const patient = document.createElement("h3");
    const reason = document.createElement("p");
    const status = document.createElement("span");
    const procedureLine = document.createElement("p");
    const doctorLine = document.createElement("p");
    const capacityLine = document.createElement("p");
    const patientLine = document.createElement("p");
    const consentLine = document.createElement("p");
    const actions = document.createElement("div");

    item.className = "request-item";
    status.className = `pill ${appointment.status}`;
    actions.className = "request-actions";

    patient.textContent = appointment.patientName;
    reason.textContent = appointment.reason;
    status.textContent = appointment.status;
    procedureLine.textContent = `Procedure: ${appointment.procedure || "Not specified"}`;
    doctorLine.textContent = `${appointment.doctorName} | ${appointment.day}, ${appointment.time}`;
    patientLine.textContent = `Patient contact: ${appointment.patientPhone}`;
    consentLine.textContent = appointment.promoConsent
      ? "Promotions: patient opted in"
      : "Promotions: no consent";

    const doctor = state.doctors.find((item) => item.id === appointment.doctorId);
    if (doctor) {
      capacityLine.textContent = `Day counter: ${getBookedCount(doctor.id, appointment.day)}/${getDailyLimit(doctor, appointment.day)} booked`;
    }

    ["confirmed", "declined", "completed"].forEach((action) => {
      const button = document.createElement("button");
      button.className = action === "confirmed" ? "primary-button" : "secondary-button";
      button.type = "button";
      button.dataset.action = action;
      button.dataset.id = appointment.id;
      button.textContent = action.charAt(0).toUpperCase() + action.slice(1);
      actions.appendChild(button);
    });

    details.append(patient, reason);
    header.append(details, status);
    item.append(header, procedureLine, doctorLine, capacityLine, patientLine, consentLine, actions);
    appointmentList.appendChild(item);
  });
}

function escapeCsv(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function exportAppointmentsCsv() {
  if (!state.appointments.length) {
    alert("No appointments to export yet.");
    return;
  }

  const headers = [
    "Submitted At",
    "Patient Name",
    "Patient Mobile",
    "Procedure",
    "Doctor",
    "Day",
    "Time",
    "Reason",
    "Status",
    "Appointment Records Consent",
    "Promotions Consent"
  ];
  const rows = state.appointments.map((appointment) => [
    appointment.submittedAt || "",
    appointment.patientName,
    appointment.patientPhone,
    appointment.procedure,
    appointment.doctorName,
    appointment.day,
    appointment.time,
    appointment.reason,
    appointment.status,
    appointment.recordsConsent ? "Yes" : "No",
    appointment.promoConsent ? "Yes" : "No"
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCsv).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `carelink-appointments-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function renderDoctorProfileTools() {
  if (!doctorProfileSelect) {
    return;
  }

  const previous = doctorProfileSelect.value;
  doctorProfileSelect.innerHTML = "";

  state.doctors.forEach((doctor) => {
    const option = document.createElement("option");
    option.value = doctor.id;
    option.textContent = doctor.name;
    doctorProfileSelect.appendChild(option);
  });

  if (state.doctors.some((doctor) => doctor.id === previous)) {
    doctorProfileSelect.value = previous;
  }

  if (specialtyOptions) {
    specialtyOptions.innerHTML = "";
    getSpecialties().filter((specialty) => specialty !== "All").forEach((specialty) => {
      const option = document.createElement("option");
      option.value = specialty;
      specialtyOptions.appendChild(option);
    });
  }

  renderSelectedDoctorProfile();
  renderDoctorDirectoryList();
}

function renderSelectedDoctorProfile() {
  if (!doctorProfileSelect || !doctorNameInput) {
    return;
  }

  const doctor = getProfileEditorDoctor();
  if (!doctor) {
    return;
  }

  doctorNameInput.value = doctor.name;
  doctorInitialsInput.value = doctor.initials;
  doctorSpecialtyInput.value = doctor.specialty;
}

function renderDoctorDirectoryList() {
  if (!doctorDirectoryList) {
    return;
  }

  doctorDirectoryList.innerHTML = "";
  state.doctors.forEach((doctor) => {
    const item = document.createElement("article");
    item.className = "doctor-directory-item";
    item.innerHTML = `<strong>${doctor.name}</strong><p>${doctor.specialty}</p>`;
    doctorDirectoryList.appendChild(item);
  });
}

function renderAvailabilityEditor() {
  if (!availabilityDoctorSelect || !availabilityDaySelect || !availabilityTimes || !dailyLimitInput) {
    return;
  }

  const previous = availabilityDoctorSelect.value;
  availabilityDoctorSelect.innerHTML = "";
  state.doctors.forEach((doctor) => {
    const option = document.createElement("option");
    option.value = doctor.id;
    option.textContent = doctor.name;
    availabilityDoctorSelect.appendChild(option);
  });

  if (state.doctors.some((doctor) => doctor.id === previous)) {
    availabilityDoctorSelect.value = previous;
  }

  const doctor = getAvailabilityEditorDoctor();
  const selectedDay = availabilityDaySelect.value;
  availabilityTimes.value = getSlotsForDoctorAndDay(doctor, selectedDay).map((slot) => slot.time).join("\n");
  dailyLimitInput.value = getDailyLimit(doctor, selectedDay);
  renderAvailabilityList();
}

function renderAvailabilityList() {
  if (!availabilityList) {
    return;
  }

  availabilityList.innerHTML = "";
  state.doctors.forEach((doctor) => {
    const item = document.createElement("article");
    const title = document.createElement("h3");
    const meta = document.createElement("p");
    const grouped = getDaysForDoctor(doctor).map((day) => {
      const times = getSlotsForDoctorAndDay(doctor, day).map((slot) => slot.time).join(", ");
      const booked = getBookedCount(doctor.id, day);
      const limit = getDailyLimit(doctor, day);
      return `${day}: ${times} (${booked}/${limit} booked)`;
    });

    item.className = "availability-item";
    title.textContent = doctor.name;
    meta.textContent = grouped.length ? grouped.join(" | ") : "No availability set";
    item.append(title, meta);
    availabilityList.appendChild(item);
  });
}

function makeInitials(name) {
  return name.split(" ").filter(Boolean).slice(-2).map((word) => word[0]).join("").toUpperCase() || "DR";
}

function handleBookingSubmit(event) {
  event.preventDefault();

  const doctor = getSelectedDoctor();
  const remaining = getRemainingCount(doctor, daySelect.value);

  if (!doctor || !slotSelect.value || !daySelect.value || remaining === 0) {
    bookingNotice.textContent = "Please choose a doctor with an available day and time.";
    return;
  }

  const formData = new FormData(event.currentTarget);
  const id = window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : String(Date.now());

  state.appointments.unshift({
    id,
    patientName: formData.get("patientName").trim(),
    patientPhone: formData.get("patientPhone").trim(),
    procedure: formData.get("procedure"),
    doctorId: doctor.id,
    doctorName: doctor.name,
    day: daySelect.value,
    time: slotSelect.value,
    reason: formData.get("reason").trim(),
    recordsConsent: formData.get("recordsConsent") === "on",
    promoConsent: formData.get("promoConsent") === "on",
    submittedAt: new Date().toISOString(),
    status: "pending"
  });

  saveToStorage(storageKeys.appointments, state.appointments);
  renderAppointments();
  renderDoctors();
  bookingNotice.textContent = "Appointment request submitted. Clinic staff can review it in the staff portal.";
  event.currentTarget.reset();
  renderDayOptions();
}

function handleAppointmentAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const appointment = state.appointments.find((item) => item.id === button.dataset.id);
  if (!appointment) {
    return;
  }

  appointment.status = button.dataset.action;
  saveToStorage(storageKeys.appointments, state.appointments);
  renderAppointments();
  renderDoctors();
  renderAvailabilityList();
}

function handleDoctorProfileSubmit(event) {
  event.preventDefault();

  const doctor = getProfileEditorDoctor();
  if (!doctor) {
    return;
  }

  doctor.name = doctorNameInput.value.trim();
  doctor.initials = doctorInitialsInput.value.trim().toUpperCase() || makeInitials(doctor.name);
  doctor.specialty = doctorSpecialtyInput.value.trim();

  saveToStorage(storageKeys.doctors, state.doctors);
  renderDoctorProfileTools();
  renderAvailabilityEditor();
  renderDoctors();

  if (doctorProfileNotice) {
    doctorProfileNotice.textContent = "Doctor details saved.";
  }
}

function handleResetDoctors() {
  state.doctors = normalizeDoctors(JSON.parse(JSON.stringify(defaultDoctors)));
  saveToStorage(storageKeys.doctors, state.doctors);
  renderDoctorProfileTools();
  renderAvailabilityEditor();
  renderDoctors();
}

function handleAvailabilitySubmit(event) {
  event.preventDefault();

  const doctor = getAvailabilityEditorDoctor();
  const day = availabilityDaySelect.value;
  const dailyLimit = Math.max(Number(dailyLimitInput.value) || 1, 1);
  const times = availabilityTimes.value.split("\n").map((time) => time.trim()).filter(Boolean);

  doctor.availability = doctor.availability.filter((slot) => slot.day !== day);
  doctor.dailyLimits[day] = dailyLimit;
  times.forEach((time) => doctor.availability.push({ day, time }));
  doctor.availability.sort((first, second) => first.day.localeCompare(second.day) || first.time.localeCompare(second.time));

  saveToStorage(storageKeys.doctors, state.doctors);
  renderAvailabilityEditor();
  renderDoctors();

  if (availabilityNotice) {
    availabilityNotice.textContent = "Availability saved.";
  }
}

if (doctorSelect) {
  doctorSelect.addEventListener("change", renderDayOptions);
}

if (daySelect) {
  daySelect.addEventListener("change", renderSlotOptions);
}

if (procedureSelect) {
  procedureSelect.addEventListener("change", () => {
    const category = procedureSelect.value.split(":")[0];
    selectedSpecialty = category;
    renderDoctors();
  });
}

document.getElementById("bookingForm")?.addEventListener("submit", handleBookingSubmit);
appointmentList?.addEventListener("click", handleAppointmentAction);
exportAppointmentsButton?.addEventListener("click", exportAppointmentsCsv);
doctorProfileSelect?.addEventListener("change", renderSelectedDoctorProfile);
doctorProfileForm?.addEventListener("submit", handleDoctorProfileSubmit);
resetDoctorsButton?.addEventListener("click", handleResetDoctors);
availabilityDoctorSelect?.addEventListener("change", renderAvailabilityEditor);
availabilityDaySelect?.addEventListener("change", renderAvailabilityEditor);
document.getElementById("availabilityForm")?.addEventListener("submit", handleAvailabilitySubmit);

renderServices();
renderDoctors();
renderAppointments();
renderDoctorProfileTools();
renderAvailabilityEditor();
