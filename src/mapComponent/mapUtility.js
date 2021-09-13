
const squaredPolar = (point, centre) => {
    return [
        Math.atan2(point[1]-centre[1], point[0]-centre[0]),
        (point[0]-centre[0])**2 + (point[1]-centre[1])**2 // Square of distance
    ];
}

// Main algorithm:
export const polySort = (points) => {
    // Get "centre of mass"
    let centre = [points.reduce((sum, p) => sum + p[0], 0) / points.length,
                  points.reduce((sum, p) => sum + p[1], 0) / points.length];

    // Sort by polar angle and distance, centered at this centre of mass.
    for (let point of points) point.push(...squaredPolar(point, centre));
    points.sort((a,b) => a[2] - b[2] || a[3] - b[3]);
    for (let point of points) point.length -= 2; 
    // Throw away the temporary polar coordinates
}
