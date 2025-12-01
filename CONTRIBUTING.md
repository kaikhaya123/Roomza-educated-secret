# Contributing to R.E.S. Website

Thank you for your interest in contributing to the Roomza's Educated Secret platform! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported in Issues
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features
1. Check existing feature requests
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Mockups or examples if possible

### Pull Requests
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Write/update tests
5. Update documentation
6. Commit with clear messages
7. Push to your fork
8. Create a Pull Request

## 📋 Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow the existing code structure
- Use meaningful variable and function names
- Add comments for complex logic
- Format code with Prettier

### Component Guidelines
```typescript
// Use functional components with TypeScript
import { FC } from 'react';

interface Props {
  title: string;
  description?: string;
}

export const MyComponent: FC<Props> = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
};
```

### API Route Guidelines
```typescript
// Always validate input
// Handle errors properly
// Return consistent response format
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = schema.parse(body);
    
    // Process request
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Message' }, { status: 400 });
  }
}
```

### Database Guidelines
- Use Prisma for all database operations
- Create migrations for schema changes
- Add indexes for frequently queried fields
- Use transactions for related operations

### Commit Messages
Follow conventional commits:
```
feat: Add voting page UI
fix: Resolve authentication bug
docs: Update README
style: Format code
refactor: Optimize vote calculation
test: Add unit tests for voting
chore: Update dependencies
```

## 🧪 Testing

### Before Submitting PR
- [ ] All tests pass: `npm test`
- [ ] Code is formatted: `npm run format`
- [ ] No lint errors: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] Changes work locally
- [ ] Documentation updated

### Writing Tests
```typescript
import { describe, it, expect } from 'vitest';

describe('Vote System', () => {
  it('should not exceed daily limit', async () => {
    // Test implementation
  });
});
```

## 📁 Project Structure

### Adding New Features
```
src/
├── app/
│   ├── (feature)/
│   │   ├── page.tsx          # Main page
│   │   └── layout.tsx        # Feature layout
│   └── api/
│       └── (feature)/
│           └── route.ts      # API endpoint
├── components/
│   └── (feature)/
│       └── Component.tsx     # React component
└── lib/
    └── (feature).ts          # Utility functions
```

## 🎨 Design Guidelines

### Tailwind Classes
- Use existing utility classes
- Follow spacing system: 4, 8, 12, 16, 20, 24...
- Use color palette from config
- Keep responsive: mobile-first

### Animations
- Use Framer Motion for complex animations
- Use CSS transitions for simple effects
- Keep animations under 500ms
- Provide reduced-motion alternatives

## 🔐 Security

### Security Considerations
- Never commit sensitive data
- Validate all user input
- Sanitize data before displaying
- Use parameterized queries (Prisma does this)
- Implement rate limiting
- Follow OWASP guidelines

### Environment Variables
- Never commit .env files
- Document new variables in .env.example
- Use strong secrets in production

## 📝 Documentation

### Update Documentation For:
- New features
- API changes
- Configuration changes
- Breaking changes
- Database schema changes

### Documentation Style
- Clear and concise
- Include code examples
- Add screenshots where helpful
- Keep it updated

## 🎯 Priority Areas

### High Priority
- Core voting functionality
- Payment integration
- Quiz system
- Admin dashboard
- Security enhancements

### Medium Priority
- Social features
- Analytics dashboard
- Email notifications
- Mobile optimization

### Low Priority
- Theme customization
- Additional languages
- Advanced statistics

## 🚀 Release Process

### Version Numbers
- Major: Breaking changes (v2.0.0)
- Minor: New features (v1.1.0)
- Patch: Bug fixes (v1.0.1)

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Version bumped
- [ ] Tagged in git
- [ ] Deployed to staging
- [ ] Smoke tests completed
- [ ] Deployed to production

## 📞 Getting Help

### Resources
- Read the README.md
- Check QUICKSTART.md for setup
- Review existing code examples
- Search closed issues

### Contact
- Email: dev@res-show.co.za
- Team chat: [Slack/Discord link]
- Office hours: Mon-Fri 9AM-5PM SAST

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Recognized in team meetings
- Eligible for rewards program

## 📜 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Other unprofessional conduct

### Enforcement
Violations will result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report issues to: conduct@res-show.co.za

## 🎓 Learning Resources

### For New Contributors
- Next.js: https://nextjs.org/docs
- TypeScript: https://www.typescriptlang.org/docs/
- Prisma: https://www.prisma.io/docs/
- Tailwind: https://tailwindcss.com/docs

### Project-Specific
- Read all documentation files
- Review existing components
- Study the database schema
- Understand the business model

## ✨ Thank You!

Every contribution helps make R.E.S. better for South African students. We appreciate your time and effort!

**Together, we're building the future of student entertainment!** 🇿🇦

---

Last Updated: November 30, 2025
