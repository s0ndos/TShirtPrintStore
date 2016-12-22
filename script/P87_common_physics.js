'use strict';

// Sample code for physics simulation

const PARTICULES_COUNT = 10;
/*

function ParticleSystem {
    this.x = [];
    var 
    Point     m_x[NUM_PARTICLES]; // Current positions
    Vector3     m_oldx[NUM_PARTICLES]; // Previous positions
    Vector3     m_a[NUM_PARTICLES]; // Force accumulators
    Vector3     m_vGravity; // Gravity
    float       m_fTimeStep;
    public:
        void        TimeStep();
    private:
        void        Verlet();
    void        SatisfyConstraints();
    void        AccumulateForces();
//    (constructors, initialization etc. omitted)
};
// Verlet integration step
void ParticleSystem::Verlet() {
    for(int i=0; i<NUM_PARTICLES; i++) {
        Vector3& x = m_x[i];
        Vector3 temp = x;
        Vector3& oldx = m_oldx[i];
        Vector3& a = m_a[i];
        x += x-oldx+a*fTimeStep*fTimeStep;
        oldx = temp;
    }
}
// This function should accumulate forces for each particle
void ParticleSystem::AccumulateForces()
{
// All particles are influenced by gravity
    for(int i=0; i<NUM_PARTICLES; i++)  m_a[i] = m_vGravity;
}
// Here constraints should be satisfied
void ParticleSystem::SatisfyConstraints() {
// Ignore this function for now
}
void ParticleSystem::TimeStep() {
    AccumulateForces();
    Verlet();
    SatisfyConstraints();
}*/
