package com.example.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.R
import com.example.data.model.UserRole
import com.example.ui.MainViewModel
import com.example.ui.components.FreeBadge
import com.example.ui.components.SectionHeader
import com.example.ui.theme.*

@Composable
fun LandingScreen(
    viewModel: MainViewModel,
    onGetStarted: () -> Unit,
    onFindTeacher: () -> Unit,
    onGuestLogin: () -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background),
        contentPadding = PaddingValues(bottom = 32.dp)
    ) {
        // Hero Header Section
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(290.dp)
            ) {
                Image(
                    painter = painterResource(id = R.drawable.img_quran_hero_1791175997637),
                    contentDescription = "Quran Academy Classroom",
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.Crop
                )
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(
                            Brush.verticalGradient(
                                colors = listOf(
                                    Color.Transparent,
                                    Color(0xCC07382E),
                                    Color(0xFF07382E)
                                )
                            )
                        )
                )
                Column(
                    modifier = Modifier
                        .align(Alignment.BottomStart)
                        .padding(20.dp)
                ) {
                    FreeBadge(modifier = Modifier.padding(bottom = 8.dp))
                    Text(
                        text = "Learn Quran — Anytime, Anywhere",
                        color = Color.White,
                        style = MaterialTheme.typography.headlineSmall,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "100% Free Forever • For Children & Adults • Verified Teachers",
                        color = GoldLight,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }

        // Mission Value Proposition Box
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = EmeraldContainer)
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(14.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(46.dp)
                            .clip(CircleShape)
                            .background(EmeraldPrimary),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Favorite,
                            contentDescription = "Non-profit mission",
                            tint = Color.White,
                            modifier = Modifier.size(24.dp)
                        )
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "Zero Subscriptions. Zero Ads.",
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.Bold,
                            color = OnEmeraldContainer
                        )
                        Text(
                            text = "Our sacred mission is to make Quranic education completely accessible to every home worldwide.",
                            style = MaterialTheme.typography.bodySmall,
                            color = OnEmeraldContainer.copy(alpha = 0.85f)
                        )
                    }
                }
            }
        }

        // Primary Call-To-Action Buttons
        item {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Button(
                    onClick = onGetStarted,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(52.dp)
                        .testTag("landing_get_started_btn"),
                    shape = RoundedCornerShape(14.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = EmeraldPrimary)
                ) {
                    Icon(
                        imageVector = Icons.Default.School,
                        contentDescription = null,
                        modifier = Modifier.size(20.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Get Started — Free Onboarding",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold
                    )
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    OutlinedButton(
                        onClick = onFindTeacher,
                        modifier = Modifier
                            .weight(1f)
                            .height(48.dp)
                            .testTag("landing_find_teacher_btn"),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.PersonSearch,
                            contentDescription = null,
                            modifier = Modifier.size(18.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(text = "Find Teacher", fontSize = 14.sp)
                    }

                    FilledTonalButton(
                        onClick = onGuestLogin,
                        modifier = Modifier
                            .weight(1f)
                            .height(48.dp)
                            .testTag("landing_guest_btn"),
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.filledTonalButtonColors(containerColor = GoldContainer)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Explore,
                            contentDescription = null,
                            tint = OnGoldContainer,
                            modifier = Modifier.size(18.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(text = "Guest Mode", color = OnGoldContainer, fontSize = 14.sp)
                    }
                }
            }
        }

        // Feature Highlights
        item {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 12.dp)
            ) {
                SectionHeader(
                    title = "Complete Learning System",
                    subtitle = "Everything you need from first Arabic letter to fluent recitation"
                )

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    FeatureCard(
                        title = "Noorani Qaida",
                        desc = "Interactive letters, Harakat & audio",
                        icon = Icons.Default.MenuBook,
                        color = EmeraldPrimary,
                        modifier = Modifier.weight(1f)
                    )
                    FeatureCard(
                        title = "Quran Reader",
                        desc = "Tajweed highlighting & repetition",
                        icon = Icons.Default.AutoStories,
                        color = TealTertiary,
                        modifier = Modifier.weight(1f)
                    )
                }

                Spacer(modifier = Modifier.height(10.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    FeatureCard(
                        title = "Live Classroom",
                        desc = "Virtual 1-on-1 lesson simulation",
                        icon = Icons.Default.VideoCameraFront,
                        color = GoldDark,
                        modifier = Modifier.weight(1f)
                    )
                    FeatureCard(
                        title = "AI Quran Tutor",
                        desc = "Tajweed rules & Makharij tips",
                        icon = Icons.Default.Psychology,
                        color = EmeraldDark,
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }

        // Role Preview Options
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Designed for Everyone in the Family",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Switch roles anytime to experience student, parent, or teacher mode:",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        FilterChip(
                            selected = viewModel.userProfile.value.role == UserRole.STUDENT,
                            onClick = {
                                viewModel.switchRole(UserRole.STUDENT)
                                onGuestLogin()
                            },
                            label = { Text("Student") },
                            leadingIcon = { Icon(Icons.Default.School, null, Modifier.size(16.dp)) },
                            modifier = Modifier.weight(1f).testTag("landing_role_student")
                        )
                        FilterChip(
                            selected = viewModel.userProfile.value.role == UserRole.PARENT,
                            onClick = {
                                viewModel.switchRole(UserRole.PARENT)
                                onGuestLogin()
                            },
                            label = { Text("Parent") },
                            leadingIcon = { Icon(Icons.Default.FamilyRestroom, null, Modifier.size(16.dp)) },
                            modifier = Modifier.weight(1f).testTag("landing_role_parent")
                        )
                        FilterChip(
                            selected = viewModel.userProfile.value.role == UserRole.TEACHER,
                            onClick = {
                                viewModel.switchRole(UserRole.TEACHER)
                                onGuestLogin()
                            },
                            label = { Text("Teacher") },
                            leadingIcon = { Icon(Icons.Default.CoPresent, null, Modifier.size(16.dp)) },
                            modifier = Modifier.weight(1f).testTag("landing_role_teacher")
                        )
                    }
                }
            }
        }

        // Testimonial
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(2.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        repeat(5) {
                            Icon(
                                imageVector = Icons.Default.Star,
                                contentDescription = null,
                                tint = GoldSecondary,
                                modifier = Modifier.size(18.dp)
                            )
                        }
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "5.0 Rating by 12,000+ Learners",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "\"My 6-year-old son started with Noorani Qaida and within 3 weeks he is reciting short Surahs with proper Tajweed. Having verified free teachers and no ads is a tremendous blessing.\"",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "— Sister Sarah M., Parent & Educator (London, UK)",
                        style = MaterialTheme.typography.bodySmall,
                        fontWeight = FontWeight.SemiBold,
                        color = EmeraldPrimary
                    )
                }
            }
        }
    }
}

@Composable
private fun FeatureCard(
    title: String,
    desc: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    color: Color,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .clip(CircleShape)
                    .background(color.copy(alpha = 0.12f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = title,
                    tint = color,
                    modifier = Modifier.size(20.dp)
                )
            }
            Spacer(modifier = Modifier.height(10.dp))
            Text(
                text = title,
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = desc,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                fontSize = 11.sp
            )
        }
    }
}
