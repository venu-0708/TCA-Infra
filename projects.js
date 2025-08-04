/**
 * Projects Page JavaScript for TCA-Infra Construction Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Project Filters
    initProjectFilters();
    
    // Initialize Project Modal
    initProjectModal();
});

/**
 * Initialize Project Filters
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        // Add click event to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active', 'bg-yellow-500', 'text-white'));
                filterButtons.forEach(btn => btn.classList.add('bg-gray-200', 'text-gray-700'));
                
                // Add active class to clicked button
                this.classList.add('active', 'bg-yellow-500', 'text-white');
                this.classList.remove('bg-gray-200', 'text-gray-700');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        // Show item with animation
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        // Hide item with animation
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Set initial styles for animation
        projectItems.forEach(item => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        });
    }
}

/**
 * Initialize Project Modal
 */
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');
    const viewButtons = document.querySelectorAll('.view-project-details');
    
    if (modal && modalContent && closeModal && viewButtons.length > 0) {
        // Open modal when view details button is clicked
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                const projectData = getProjectData(projectId);
                
                if (projectData) {
                    // Populate modal content
                    modalContent.innerHTML = generateProjectModalContent(projectData);
                    
                    // Show modal with animation
                    modal.classList.remove('hidden');
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        modal.style.opacity = '1';
                    }, 50);
                    
                    // Prevent body scrolling
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Close modal when close button is clicked
        closeModal.addEventListener('click', closeProjectModal);
        
        // Close modal when clicking outside content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProjectModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeProjectModal();
            }
        });
        
        // Set modal transition
        modal.style.transition = 'opacity 0.3s ease';
    }
    
    function closeProjectModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.add('hidden');
            // Allow body scrolling again
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    function generateProjectModalContent(project) {
        return `
            <div class="mb-6">
                <h2 class="text-3xl font-bold text-gray-800 mb-2">${project.title}</h2>
                <div class="flex items-center mb-4">
                    <span class="bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full mr-3">${project.category}</span>
                    <span class="text-gray-500">Completed: ${project.completionDate}</span>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <img src="${project.mainImage}" alt="${project.title}" class="w-full h-auto rounded-lg shadow-md">
                </div>
                <div>
                    <h3 class="text-xl font-bold mb-3">Project Overview</h3>
                    <p class="text-gray-600 mb-4">${project.description}</p>
                    
                    <div class="mb-4">
                        <h4 class="font-semibold mb-2">Project Details:</h4>
                        <ul class="space-y-1 text-gray-600">
                            ${project.details.map(detail => `<li class="flex items-start">
                                <svg class="h-5 w-5 mr-2 mt-0.5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                </svg>
                                ${detail}
                            </li>`).join('')}
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold mb-2">Client:</h4>
                        <p class="text-gray-600">${project.client}</p>
                    </div>
                </div>
            </div>
            
            <div class="mb-6">
                <h3 class="text-xl font-bold mb-3">Project Gallery</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    ${project.gallery.map(image => `
                        <div class="gallery-item rounded-lg overflow-hidden shadow-md">
                            <img src="${image}" alt="Project Image" class="w-full h-32 object-cover">
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="mb-6">
                <h3 class="text-xl font-bold mb-3">Challenges & Solutions</h3>
                <p class="text-gray-600 mb-4">${project.challenges}</p>
            </div>
            
            <div class="border-t border-gray-200 pt-6 mt-6">
                <h3 class="text-xl font-bold mb-3">Client Testimonial</h3>
                <div class="bg-gray-50 p-4 rounded-lg italic text-gray-600 mb-4">${project.testimonial}</div>
