/* ==========================================================================
   M/S Rafia Enterprises - Main Interactive Script (Pure Vanilla JavaScript)
   Zero frameworks, zero build tools, GitHub Pages compatible.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Sticky Header Scroll Effect & Mobile Menu Toggle
     ------------------------------------------------------------------------ */
  var header = document.getElementById('site-header');
  var mobileMenuBtn = document.getElementById('mobile-menu-btn');
  var mobileDrawer = document.getElementById('mobile-drawer');
  var iconMenu = document.getElementById('icon-menu');
  var iconClose = document.getElementById('icon-close');

  function updateHeaderOnScroll() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
  updateHeaderOnScroll();

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', function () {
      var isOpen = !mobileDrawer.classList.contains('hidden');
      if (isOpen) {
        mobileDrawer.classList.add('hidden');
        if (iconMenu) iconMenu.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileDrawer.classList.remove('hidden');
        if (iconMenu) iconMenu.classList.add('hidden');
        if (iconClose) iconClose.classList.remove('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      }
    });

    var drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileDrawer.classList.add('hidden');
        if (iconMenu) iconMenu.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. Animated Hero Counters
     ------------------------------------------------------------------------ */
  var statsSection = document.getElementById('hero-stats-strip');
  var countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    var yearsEl = document.getElementById('counter-years');
    var areaEl = document.getElementById('counter-area');
    var teamsEl = document.getElementById('counter-teams');
    var machinesEl = document.getElementById('counter-machines');

    var duration = 1200;
    var steps = 40;
    var stepTime = duration / steps;
    var currentStep = 0;

    var timer = setInterval(function () {
      currentStep += 1;
      var progress = Math.min(currentStep / steps, 1);

      if (yearsEl) yearsEl.textContent = Math.floor(19 * progress) + '+';
      if (areaEl) areaEl.textContent = (2.5 * progress).toFixed(1) + '+ ';
      if (teamsEl) teamsEl.textContent = String(Math.floor(4 * progress));
      if (machinesEl) machinesEl.textContent = String(Math.floor(4 * progress));

      if (currentStep >= steps) {
        clearInterval(timer);
        if (yearsEl) yearsEl.textContent = '19+';
        if (areaEl) areaEl.textContent = '2.5+ ';
        if (teamsEl) teamsEl.textContent = '4';
        if (machinesEl) machinesEl.textContent = '4';
      }
    }, stepTime);
  }

  if (statsSection && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0] && entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(statsSection);
  } else {
    animateCounters();
  }

  /* ------------------------------------------------------------------------
     3. Service Technical Specs Modal & Quote Pre-Selection
     ------------------------------------------------------------------------ */
  var SERVICES_DATA = {
    'thermoplastic-marking': {
      title: 'Thermoplastic Road Marking',
      standards: 'MoRTH Section 803 / IRC:35-2015',
      image: 'images/thermoplastic.jpg',
      fullDesc:
        'Execution of high-durability hot-applied thermoplastic road marking with automated pre-heaters and screed application. Services include edge lines, center lines, broken lane markings, chevron channelizing markings, pedestrian zebra crossings, directional arrows, and word messages with high-index glass beads for superior retroreflectivity.',
      specifications: [
        'Hot-applied thermoplastic material conforming to MoRTH Section 803 / Clause 803.4',
        'Drop-on type surface glass beads adhering to BS 6088 / IRC:35 standards',
        'Skid resistance value (SRV) ≥ 45 BPN for heavy highway traffic',
        'High retro-reflectivity for clear nocturnal and adverse weather visibility',
      ],
      equipmentUsed:
        'Automatic & Semi-Automatic Thermoplastic Applicators, Hydrostatic Pre-Heaters',
    },
    'retro-reflective-sign-boards': {
      title: 'Retro-Reflective Road Sign Boards Supply & Installation',
      standards: 'IRC:67-2022 / MoRTH Section 800 (Clause 801)',
      image: 'images/road-signboards.jpg',
      fullDesc:
        'We provide the supply and professional installation of high-quality retro-reflective road sign boards for highways, national highways, state highways, urban roads and industrial areas. Our solutions include traffic regulatory signs, warning signs, informatory signs, directional signs, mandatory signs and other road safety signage as per project requirements. These signs are designed to improve road visibility, provide clear guidance to drivers and enhance road safety, particularly during nighttime and low-light conditions through retro-reflective technology.',
      specifications: [
        'High-intensity microprismatic retro-reflective sheeting (HIP / Type IV / Type XI Diamond Grade)',
        'Engineered in strict accordance with IRC:67-2022 (Code of Practice for Road Signs) & MoRTH Section 800 (Clause 801)',
        'Traffic regulatory signs, warning signs, informatory signs, directional signs & mandatory road safety signage',
        'Anti-corrosive aluminum composite panel (ACP) / galvanized steel backing with theft-resistant fasteners & ground posts',
      ],
      equipmentUsed:
        'Core Drilling Rigs, Hydraulic Post Drivers, Overhead Gantry & Cantilever Erection Rigging',
    },
    'road-studs-fixing': {
      title: 'Road Studs Fixing (Cat-Eyes)',
      standards: 'ASTM D4280 / MoRTH Clause 804 / IRC:35',
      image: 'images/road-studs.jpg',
      fullDesc:
        'Precision drilling, epoxy grouting, and anchoring of aluminum die-cast and ABS cat-eye road studs. Engineered to withstand heavy axle highway traffic while delivering intense retro-reflection under headlight illumination for curved roads, medians, and lane dividing lines.',
      specifications: [
        'Twin prismatic reflective lens with 360° and bi-directional reflection',
        'High-grade aviation aluminum alloy or reinforced polycarbonate casing',
        'Compressive load resistance exceeding 25–30 metric tonnes',
        'Two-part high-bond epoxy adhesive anchoring for zero dislodgement',
      ],
      equipmentUsed: 'Core Drilling Machines, Surface Grinders, Epoxy Dispensing Equipment',
    },
    'delineator-installation': {
      title: 'Delineator Supply & Installation',
      standards: 'IRC:79-2019 / MoRTH Section 800',
      image: 'images/highway-fleet.jpg',
      fullDesc:
        'Highway roadside guide posts and hazard markers fabricated from impact-resistant polymer/galvanized steel with high-intensity diamond grade reflective sheeting. Providing continuous optical alignment and guidance along ghat sections, embankments, bridge approaches, and median dividers.',
      specifications: [
        'High-intensity micro-prismatic retroreflective sheeting (Class IV / Type XI)',
        'UV-stabilized, impact-resistant flexible or rigid polymer construction',
        'Concrete footing anchoring or guardrail bracket mounting',
        'All-weather visibility conforming to IRC:79 standard for highway guide posts',
      ],
      equipmentUsed: 'Hydraulic Post Drivers, Excavation & Concrete Base Tooling',
    },
    'mastic-asphalt-work': {
      title: 'Mastic Asphalt Work',
      standards: 'MoRTH Section 515 / IRC:SP:107',
      image: 'images/hero.jpg',
      fullDesc:
        'Specialized application of impermeable, dense mastic asphalt matrix. Designed to absorb severe braking stresses, resist water seepage into bridge sub-structures, and prevent rutting under heavy commercial vehicle loads.',
      specifications: [
        'Self-healing, voidless bituminous mix offering 100% water impermeability',
        'Applied at controlled temperatures (175°C - 205°C) using mechanical stirrers',
        'Surface texturized with pre-coated anti-skid bitumen chips (chipping)',
        'High durability under static and channelized heavy goods vehicle (HGV) loads',
      ],
      equipmentUsed:
        'Mastic Cookers with Agitators, Heavy-Duty Spreading & Chipping Trowels',
    },
    'complete-road-safety': {
      title: 'Complete Road Safety Work',
      standards: 'IRC Guidelines & Ministry of Road Transport and Highways (MoRTH)',
      image: 'images/thermoplastic.jpg',
      fullDesc:
        'End-to-end execution of comprehensive road safety infrastructure for EPC highway packages, expressway developments, and smart city ring roads. From initial site survey and chainage marking to final inspection handover.',
      specifications: [
        'Unified execution covering marking, studs, delineators, and signage',
        'Dedicated safety engineer and site supervisor deployed per package',
        'Strict adherence to client delivery schedules and highway safety audit reports',
        'Comprehensive QA/QC documentation and test certificates provided',
      ],
      equipmentUsed: 'Full Fleet Deployment: 4 Machinery Sets & Organized Crews',
    },
    'other-infrastructure-works': {
      title: 'Other Highway & Road Infrastructure Works',
      standards: 'Client Technical Specifications & MoRTH / IRC Codes',
      image: 'images/road-studs.jpg',
      fullDesc:
        'Customized infrastructure execution including factory internal road markings, airport apron markings, warehouse floor layouts, parking guidance systems, rumble strip installations, and retro-reflective pavement safety enhancements tailored to specific client project specifications.',
      specifications: [
        'Flexible deployment for industrial plants (Steel, Power, Petrochemical)',
        'High-friction surface treatments and rumble strip profiling',
        'Reflective kerb painting and median painting services',
        'Fast turnaround to minimize facility operational downtime',
      ],
      equipmentUsed: 'Multi-purpose Road Construction & Marking Tooling',
    },
  };

  var serviceModal = document.getElementById('service-modal');
  var modalTitle = document.getElementById('modal-service-title');
  var modalStd = document.getElementById('modal-service-std');
  var modalImg = document.getElementById('modal-service-img');
  var modalDesc = document.getElementById('modal-service-desc');
  var modalSpecs = document.getElementById('modal-service-specs');
  var modalEquip = document.getElementById('modal-service-equip');
  var modalEnquireBtn = document.getElementById('modal-service-enquire');
  var closeServiceModalBtn = document.getElementById('close-service-modal');
  var closeServiceModalFooterBtn = document.getElementById('close-service-modal-footer');
  var workTypeSelect = document.getElementById('enquiry-work-type');

  function selectWorkType(serviceTitle) {
    if (!workTypeSelect || !serviceTitle) return;
    for (var i = 0; i < workTypeSelect.options.length; i++) {
      if (workTypeSelect.options[i].value === serviceTitle) {
        workTypeSelect.selectedIndex = i;
        break;
      }
    }
  }

  function openServiceModal(serviceId) {
    var data = SERVICES_DATA[serviceId];
    if (!data || !serviceModal) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalStd) modalStd.textContent = data.standards;
    if (modalImg) {
      modalImg.src = data.image;
      modalImg.alt = data.title;
    }
    if (modalDesc) modalDesc.textContent = data.fullDesc;
    if (modalEquip) modalEquip.textContent = data.equipmentUsed;

    if (modalSpecs) {
      modalSpecs.innerHTML = '';
      data.specifications.forEach(function (spec) {
        var row = document.createElement('div');
        row.className = 'spec-line';
        row.innerHTML =
          '<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' +
          '<span></span>';
        row.querySelector('span').textContent = spec;
        modalSpecs.appendChild(row);
      });
    }

    if (modalEnquireBtn) {
      modalEnquireBtn.onclick = function () {
        selectWorkType(data.title);
        closeServiceModal();
      };
    }

    serviceModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeServiceModal() {
    if (!serviceModal) return;
    serviceModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-service]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-open-service');
      openServiceModal(id);
    });
  });

  document.querySelectorAll('[data-quote-service]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var title = btn.getAttribute('data-quote-service');
      selectWorkType(title);
    });
  });

  if (closeServiceModalBtn) closeServiceModalBtn.addEventListener('click', closeServiceModal);
  if (closeServiceModalFooterBtn) {
    closeServiceModalFooterBtn.addEventListener('click', closeServiceModal);
  }
  if (serviceModal) {
    serviceModal.addEventListener('click', function (e) {
      if (e.target === serviceModal) closeServiceModal();
    });
  }

  /* ------------------------------------------------------------------------
     4. Projects Portfolio Filtering & Area Sorting
     ------------------------------------------------------------------------ */
  var projectSearchInput = document.getElementById('project-search');
  var projectClearBtn = document.getElementById('clear-project-search');
  var sortAreaBtn = document.getElementById('sort-area-btn');
  var projectsGrid = document.getElementById('projects-grid');
  var projectCountEl = document.getElementById('tracked-projects-count');
  var projectAreaTotalEl = document.getElementById('executed-scope-total');
  var projectsEmptyEl = document.getElementById('projects-empty');
  var resetProjectsBtn = document.getElementById('reset-project-filters');

  var stateFilter = 'All';
  var categoryFilter = 'All';
  var sortByArea = false;

  var allProjectCards = projectsGrid
    ? Array.prototype.slice.call(projectsGrid.querySelectorAll('.project-card'))
    : [];

  function applyProjectFilters() {
    if (!projectsGrid) return;

    var query = projectSearchInput ? projectSearchInput.value.trim().toLowerCase() : '';
    if (projectClearBtn) {
      projectClearBtn.classList.toggle('hidden', query.length === 0);
    }

    var matching = allProjectCards.filter(function (card) {
      var client = (card.getAttribute('data-client') || '').toLowerCase();
      var location = (card.getAttribute('data-location') || '').toLowerCase();
      var scope = (card.getAttribute('data-scope') || '').toLowerCase();
      var state = card.getAttribute('data-state') || '';
      var type = card.getAttribute('data-type') || '';

      var matchesQuery =
        !query ||
        client.indexOf(query) !== -1 ||
        location.indexOf(query) !== -1 ||
        scope.indexOf(query) !== -1;
      var matchesState = stateFilter === 'All' || state === stateFilter;
      var matchesType = categoryFilter === 'All' || type === categoryFilter;

      return matchesQuery && matchesState && matchesType;
    });

    // Order cards cleanly
    var ordered = matching.slice();
    if (sortByArea) {
      ordered.sort(function (a, b) {
        var areaA = parseInt(a.getAttribute('data-area') || '0', 10);
        var areaB = parseInt(b.getAttribute('data-area') || '0', 10);
        return areaB - areaA;
      });
    } else {
      ordered.sort(function (a, b) {
        var idxA = parseInt(a.getAttribute('data-order') || '0', 10);
        var idxB = parseInt(b.getAttribute('data-order') || '0', 10);
        return idxA - idxB;
      });
    }

    allProjectCards.forEach(function (card) {
      card.classList.add('hidden');
    });

    var totalArea = 0;
    ordered.forEach(function (card) {
      card.classList.remove('hidden');
      projectsGrid.appendChild(card);
      totalArea += parseInt(card.getAttribute('data-area') || '0', 10);
    });

    if (projectCountEl) projectCountEl.textContent = String(ordered.length);
    if (projectAreaTotalEl) {
      projectAreaTotalEl.textContent =
        totalArea > 0 ? Math.floor(totalArea / 1000) + 'k+' : '2.5L+';
    }
    if (projectsEmptyEl) {
      projectsEmptyEl.classList.toggle('hidden', ordered.length > 0);
    }
  }

  if (projectSearchInput) {
    projectSearchInput.addEventListener('input', applyProjectFilters);
  }
  if (projectClearBtn) {
    projectClearBtn.addEventListener('click', function () {
      if (projectSearchInput) projectSearchInput.value = '';
      applyProjectFilters();
    });
  }
  if (sortAreaBtn) {
    sortAreaBtn.addEventListener('click', function () {
      sortByArea = !sortByArea;
      sortAreaBtn.classList.toggle('active', sortByArea);
      applyProjectFilters();
    });
  }

  document.querySelectorAll('[data-filter-state]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      stateFilter = btn.getAttribute('data-filter-state') || 'All';
      document.querySelectorAll('[data-filter-state]').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
      applyProjectFilters();
    });
  });

  document.querySelectorAll('[data-filter-type]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      categoryFilter = btn.getAttribute('data-filter-type') || 'All';
      document.querySelectorAll('[data-filter-type]').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
      applyProjectFilters();
    });
  });

  if (resetProjectsBtn) {
    resetProjectsBtn.addEventListener('click', function () {
      if (projectSearchInput) projectSearchInput.value = '';
      stateFilter = 'All';
      categoryFilter = 'All';
      sortByArea = false;
      if (sortAreaBtn) sortAreaBtn.classList.remove('active');
      document.querySelectorAll('[data-filter-state]').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-filter-state') === 'All');
      });
      document.querySelectorAll('[data-filter-type]').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-filter-type') === 'All');
      });
      applyProjectFilters();
    });
  }

  /* ------------------------------------------------------------------------
     5. Gallery Category Filter & Lightbox Modal
     ------------------------------------------------------------------------ */
  var galleryCards = document.querySelectorAll('.gallery-card');
  var lightboxModal = document.getElementById('lightbox-modal');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCategory = document.getElementById('lightbox-category');
  var lightboxTitle = document.getElementById('lightbox-title');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var closeLightboxBtn = document.getElementById('close-lightbox');
  var lightboxQuoteBtn = document.getElementById('lightbox-quote-btn');

  document.querySelectorAll('[data-gallery-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var selected = btn.getAttribute('data-gallery-filter') || 'All';
      document.querySelectorAll('[data-gallery-filter]').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
      galleryCards.forEach(function (card) {
        var cat = card.getAttribute('data-category') || '';
        card.classList.toggle('hidden', selected !== 'All' && cat !== selected);
      });
    });
  });

  function openLightbox(card) {
    if (!lightboxModal) return;
    var img = card.querySelector('img');
    var title = card.getAttribute('data-title') || '';
    var cat = card.getAttribute('data-category') || '';
    var caption = card.getAttribute('data-caption') || '';

    if (lightboxImg && img) {
      lightboxImg.src = img.getAttribute('src') || '';
      lightboxImg.alt = title;
    }
    if (lightboxCategory) lightboxCategory.textContent = cat;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCaption) lightboxCaption.textContent = caption;

    lightboxModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  galleryCards.forEach(function (card) {
    card.addEventListener('click', function () {
      openLightbox(card);
    });
  });

  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
  if (lightboxQuoteBtn) lightboxQuoteBtn.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', function (e) {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeServiceModal();
      closeLightbox();
    }
  });

  /* ------------------------------------------------------------------------
     6. Copy GST Number Utility
     ------------------------------------------------------------------------ */
  var copyGstBtn = document.getElementById('copy-gst-btn');
  var copyGstLabel = document.getElementById('copy-gst-label');
  if (copyGstBtn && copyGstLabel) {
    copyGstBtn.addEventListener('click', function () {
      var gstText = '19AALPI8279AIZG';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(gstText).then(function () {
          copyGstLabel.textContent = 'Copied';
          copyGstLabel.style.color = '#34d399';
          setTimeout(function () {
            copyGstLabel.textContent = 'Copy';
            copyGstLabel.style.color = '';
          }, 2000);
        });
      }
    });
  }

  /* ------------------------------------------------------------------------
     7. Contact Form -> Direct WhatsApp Dispatch (9434677298)
     No fake backend success message. Opens WhatsApp with formatted enquiry.
     ------------------------------------------------------------------------ */
  var enquiryForm = document.getElementById('enquiry-form');
  var formErrorBox = document.getElementById('enquiry-error');
  var waPreviewPanel = document.getElementById('whatsapp-ready-panel');
  var waLaunchLink = document.getElementById('whatsapp-launch-link');
  var waMessagePreview = document.getElementById('whatsapp-message-preview');
  var waEditBtn = document.getElementById('enquiry-edit-btn');
  var directWaLink = document.getElementById('direct-wa-form-btn');

  var ENQUIRY_WHATSAPP_NUMBER = '919434677298';

  function getFormValues() {
    return {
      name: (document.getElementById('enquiry-name') || {}).value || '',
      company: (document.getElementById('enquiry-company') || {}).value || '',
      mobile: (document.getElementById('enquiry-mobile') || {}).value || '',
      email: (document.getElementById('enquiry-email') || {}).value || '',
      location: (document.getElementById('enquiry-location') || {}).value || '',
      area: (document.getElementById('enquiry-area') || {}).value || '',
      workType: (document.getElementById('enquiry-work-type') || {}).value || 'Thermoplastic Road Marking',
      contractModel:
        (document.getElementById('enquiry-contract-model') || {}).value ||
        'Material + Labour Contract',
      message: (document.getElementById('enquiry-message') || {}).value || '',
    };
  }

  function buildEnquiryMessageText(vals) {
    return [
      '*New Business Enquiry - M/S Rafia Enterprises*',
      '*Name:* ' + (vals.name.trim() || 'Not provided'),
      '*Company:* ' + (vals.company.trim() || 'Not provided'),
      '*Mobile:* ' + (vals.mobile.trim() || 'Not provided'),
      '*Email:* ' + (vals.email.trim() || 'Not provided'),
      '*Project Location:* ' + (vals.location.trim() || 'Not provided'),
      '*Work Type:* ' + vals.workType,
      '*Contract Model:* ' + vals.contractModel,
      '*Approximate Area:* ' + (vals.area.trim() || 'To be determined'),
      '*Message:* ' + (vals.message.trim() || 'Please provide commercial quotation.'),
    ].join('\n');
  }

  function buildEnquiryWhatsAppUrl(phoneWithCountry, vals) {
    var plainText = buildEnquiryMessageText(vals);
    return 'https://wa.me/' + phoneWithCountry + '?text=' + encodeURIComponent(plainText);
  }

  if (directWaLink && enquiryForm) {
    enquiryForm.addEventListener('input', function () {
      var vals = getFormValues();
      directWaLink.href = buildEnquiryWhatsAppUrl('917908238544', vals);
    });
  }

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var vals = getFormValues();

      if (!vals.name.trim() || !vals.mobile.trim()) {
        if (formErrorBox) {
          formErrorBox.textContent = 'Please enter your Name and Mobile Number before submitting.';
          formErrorBox.classList.remove('hidden');
        }
        return;
      }

      if (formErrorBox) formErrorBox.classList.add('hidden');

      var targetUrl = buildEnquiryWhatsAppUrl(ENQUIRY_WHATSAPP_NUMBER, vals);
      var formattedMsg = buildEnquiryMessageText(vals);

      if (waLaunchLink) waLaunchLink.href = targetUrl;
      if (waMessagePreview) waMessagePreview.textContent = formattedMsg;

      // Show honest WhatsApp confirmation & manual open button
      enquiryForm.classList.add('hidden');
      if (waPreviewPanel) waPreviewPanel.classList.remove('hidden');

      // Open WhatsApp automatically via clean anchor click
      var tempLink = document.createElement('a');
      tempLink.href = targetUrl;
      tempLink.target = '_blank';
      tempLink.rel = 'noopener noreferrer';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    });
  }

  if (waEditBtn && enquiryForm && waPreviewPanel) {
    waEditBtn.addEventListener('click', function () {
      waPreviewPanel.classList.add('hidden');
      enquiryForm.classList.remove('hidden');
    });
  }

  /* ------------------------------------------------------------------------
     8. Print Profile Button
     ------------------------------------------------------------------------ */
  var printBtn = document.getElementById('print-profile-btn');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      window.print();
    });
  }
})();
